# Blind video-QC evaluation run: dispatcher runbook (Claude Opus 5.5)

You are the **dispatcher** for a blind, frozen evaluation. You do not evaluate any video yourself.
Your only job is to hand each pre-written job to a fresh delegated evaluator, record its terminal
status, and freeze the outputs when every job is done. If your context is ever compacted or
you lose your place, re-read this file and run `status`; all state lives on disk.

## Blinding rules (strict)

- Work only under `/tmp/video-qc-opus55-blind-261028`. Do not open, list, or search any other
  directory on this machine (no `find /`, no home-directory browsing, no other `/tmp` folders),
  and no web search or fetch. There is no answer key here, and you must not go looking for one.
- Do not read evaluators' prediction contents (`output/source/responses/`, `output/*/raw/`), and never
  edit them. Do not score, summarize, deduplicate, or judge findings. The coordinator script
  parses and wraps them.
- Do not change `protocol.json`, `route.mjs`, the prompts, or the scripts. If something seems broken,
  record it as an incident in your final report rather than working around it in a way that alters what
  evaluators see.

## Commands

All from `/tmp/video-qc-opus55-blind-261028/output/source`:

```
python3 coordinate.py init                    # once; idempotent
python3 coordinate.py next N                  # claim up to N jobs → one JSON line each {key, clientRequestId, task}
python3 coordinate.py dispatched KEY TASK_ID  # after delegate_task returns
python3 coordinate.py done KEY STATUS         # on each child's terminal status: completed|failed|cancelled|interrupted
python3 coordinate.py retry KEY               # requeue a failed/parse_error job (max 3 attempts total)
python3 coordinate.py unclaim                 # return claimed-but-never-dispatched jobs to pending
python3 coordinate.py status
```

## Loop

1. `python3 coordinate.py init`, then `python3 coordinate.py unclaim` (this is safe on resume).
2. Keep **6 jobs in flight**. For each job line from `next`, call the T3 `delegate_task` tool with:
   - `task`: the job's `task` string, verbatim (it points the child at its prompt file)
   - `title`: the job's `key`
   - `clientRequestId`: the job's `clientRequestId`
   - `mode`: `"async"`, `role`: `"general"`, `isolation`: `"shared"`
   - `target`: `{"providerInstanceId": "claudeAgent", "model": "claude-opus-5-5", "options": {"effort": "high", "fastMode": false}}`

   Check that the returned providerInstanceId/model/options match, then run `dispatched KEY TASK_ID`.
   Never put anything else in the task text: no hints, no context from other jobs.
3. End your turn while jobs run. Each child's completion wakes you. For each finished child, run
   `done KEY completed` (or the actual terminal status; `done` also accepts the taskId in place of KEY). If the coordinator reports `parse_error` or
   `failed`, run `retry KEY` once. Then top back up to 6 in flight with `next`.
   Don't spawn watchers, and don't poll in a tight loop.
4. The job list grows on its own: each scene inventory, once it completes, adds its routed jobs
   for samples 1–3. The coordinator holds core samples 2–3 until all inventories are done. Expect
   about 266 + 3 × (routed checks) jobs, roughly 450–500 in total.
5. If children start failing because of usage or rate limits: stop dispatching, run `unclaim`,
   and end your turn with a short message: "Paused: usage limit. N/M complete. Send 'continue'
   to resume." On 'continue', resume from step 1.

## Finish

When `status` shows every job `completed` and none in flight:

```
python3 validate.py      # structural/provenance audit only
python3 freeze.py        # only if validation passed
```

Then send a short final message: total jobs, retries and incidents, validation pass/fail, and the
freeze receipt hash. Do not describe or interpret any findings.
