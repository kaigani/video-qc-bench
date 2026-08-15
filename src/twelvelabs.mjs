// Minimal TwelveLabs client: sync /analyze endpoint with Pegasus.
// Docs: https://docs.twelvelabs.io/v1.3/api-reference/analyze-videos/sync-analysis
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT, sleep } from './openrouter.mjs';

export function loadTwelveLabsKey() {
  if (process.env.TWELVELABS_API_KEY) return process.env.TWELVELABS_API_KEY;
  const envPath = join(PROJECT_ROOT, '.env');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?TWELVELABS_API_KEY\s*=\s*["']?([^"'\s#]+)/);
      if (m) return m[1];
    }
  }
  throw new Error(`TWELVELABS_API_KEY not found in environment or ${join(PROJECT_ROOT, '.env')}`);
}

const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

/**
 * Analyze a video with a text prompt. videoDataUrl is our data:video/mp4;base64,... URL;
 * TwelveLabs wants the raw base64 string (max 30MB).
 * Returns { text, usage, raw, latencyMs } matching the OpenRouter client's shape.
 */
export async function callTwelveLabs({ apiKey, model = 'pegasus1.5', prompt, videoDataUrl, maxRetries = 3, timeoutMs = 600_000 }) {
  const base64String = videoDataUrl.replace(/^data:[^,]+,/, '');
  const body = JSON.stringify({
    model_name: model,
    video: { type: 'base64_string', base64_string: base64String },
    prompt_v2: { input_text: prompt },
    temperature: 0.2,
    max_tokens: 4096,
    stream: false,
  });

  let lastErr;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const start = Date.now();
    try {
      const res = await fetch('https://api.twelvelabs.io/v1.3/analyze', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
        body,
        signal: AbortSignal.timeout(timeoutMs),
      });
      const latencyMs = Date.now() - start;
      const raw = await res.json().catch(() => null);
      if (!res.ok || raw === null) {
        const msg = raw?.message ?? raw?.error?.message ?? `HTTP ${res.status}`;
        if (RETRYABLE.has(res.status) && attempt < maxRetries) {
          lastErr = new Error(`twelvelabs/${model}: ${msg} (attempt ${attempt})`);
          await sleep(5000 * 2 ** (attempt - 1));
          continue;
        }
        throw new Error(`twelvelabs/${model}: ${msg}`);
      }
      const text = raw.data ?? '';
      if (!text.trim() && attempt < maxRetries) {
        lastErr = new Error(`twelvelabs/${model}: empty content (attempt ${attempt})`);
        await sleep(5000 * 2 ** (attempt - 1));
        continue;
      }
      const usage = raw.usage
        ? { prompt_tokens: raw.usage.input_tokens, completion_tokens: raw.usage.output_tokens, total_tokens: (raw.usage.input_tokens ?? 0) + (raw.usage.output_tokens ?? 0) }
        : null;
      return { text, usage, raw, latencyMs };
    } catch (err) {
      lastErr = err;
      const retryable = err.name === 'TimeoutError' || err.name === 'AbortError' || err.message?.includes('fetch failed');
      if (retryable && attempt < maxRetries) {
        await sleep(5000 * 2 ** (attempt - 1));
        continue;
      }
      throw lastErr;
    }
  }
  throw lastErr;
}
