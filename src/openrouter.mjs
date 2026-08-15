// Minimal OpenRouter client: .env loading, video encoding, chat call with retry.
import { readFileSync, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export function loadApiKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
  const envPath = join(PROJECT_ROOT, '.env');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?OPENROUTER_API_KEY\s*=\s*["']?([^"'\s#]+)/);
      if (m) return m[1];
    }
  }
  throw new Error(
    `OPENROUTER_API_KEY not found. Add it to ${envPath} as:\n  OPENROUTER_API_KEY=sk-or-...`
  );
}

export async function encodeVideo(videoPath) {
  const buf = await readFile(videoPath);
  return `data:video/mp4;base64,${buf.toString('base64')}`;
}

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

/**
 * Send one prompt + video to a model. Returns { text, usage, raw, latencyMs }.
 */
export async function callModel({ apiKey, model, prompt, videoDataUrl, reasoning = false, maxRetries = 3, timeoutMs = 300_000 }) {
  const body = JSON.stringify({
    model,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'video_url', video_url: { url: videoDataUrl } },
        ],
      },
    ],
    usage: { include: true },
    ...(reasoning ? { reasoning: { enabled: true } } : {}),
  });

  let lastErr;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const start = Date.now();
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body,
        signal: AbortSignal.timeout(timeoutMs),
      });
      const raw = await res.json().catch(() => null);
      const latencyMs = Date.now() - start;
      if (raw === null && attempt < maxRetries) {
        lastErr = new Error(`${model}: non-JSON response body, HTTP ${res.status} (attempt ${attempt})`);
        await sleep(2000 * 2 ** (attempt - 1));
        continue;
      }
      if (raw === null) throw new Error(`${model}: non-JSON response body, HTTP ${res.status}`);
      if (!res.ok || raw?.error) {
        const msg = raw?.error?.message ?? `HTTP ${res.status}`;
        const code = raw?.error?.code ?? res.status;
        if (RETRYABLE_STATUS.has(Number(code)) && attempt < maxRetries) {
          lastErr = new Error(`${model}: ${msg} (attempt ${attempt})`);
          await sleep(2000 * 2 ** (attempt - 1));
          continue;
        }
        throw new Error(`${model}: ${msg}`);
      }
      const text = raw.choices?.[0]?.message?.content ?? '';
      if (!text.trim() && attempt < maxRetries) {
        // Providers occasionally drop the video (prompt_tokens collapses) and
        // return empty content with only reasoning tokens — treat as retryable.
        lastErr = new Error(`${model}: empty content (attempt ${attempt})`);
        await sleep(2000 * 2 ** (attempt - 1));
        continue;
      }
      return { text, usage: raw.usage ?? null, raw, latencyMs };
    } catch (err) {
      lastErr = err;
      const retryable = err.name === 'TimeoutError' || err.name === 'AbortError' || err.cause?.code === 'ECONNRESET' || err.message?.includes('fetch failed');
      if (retryable && attempt < maxRetries) {
        await sleep(2000 * 2 ** (attempt - 1));
        continue;
      }
      throw lastErr;
    }
  }
  throw lastErr;
}

/** Leniently extract the first JSON object from model output. */
export function parseFindings(text) {
  if (!text) return { ok: false, error: 'empty response' };
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return { ok: false, error: 'no JSON object found' };
  try {
    const obj = JSON.parse(cleaned.slice(start, end + 1));
    if (!Array.isArray(obj.findings)) return { ok: false, error: 'no findings array' };
    return { ok: true, ledger: obj.ledger ?? [], findings: obj.findings };
  } catch (err) {
    return { ok: false, error: `JSON parse failed: ${err.message}` };
  }
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
