# Model comparison: findings per video × role

Cell format: gemini-3.6-flash / qwen3.8-max / gemini-pro-latest / gemma-4-31b-it / twelvelabs/pegasus1.5. Runs: gemini-3.6-flash (2026-08-14_google-gemini-3.6-flash), qwen3.8-max (2026-08-14_qwen-qwen3.8-max), gemini-pro-latest (2026-08-14_gemini-pro-latest), gemma-4-31b-it (2026-08-14_gemma-4-31b), twelvelabs/pegasus1.5 (2026-08-14_twelvelabs-pegasus1.5).

| Video | baseline generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence | total |
|---|---|---|---|---|---|---|---|
| _long-scene | 2 / 6 / 3 / 2 / 1 | 1 / 3 / 1 / 0 / 0 | 0 / 1 / 3 / 0 / 0 | 1 / 0 / 1 / 0 / 0 | 1 / 1 / 2 / 0 / 0 | 0 / 2 / 0 / 0 / 0 | **5 / 13 / 10 / 2 / 1** |
| child-marbles | 0 / 3 / 1 / 1 / 0 | 0 / 0 / 3 / 0 / 0 | 0 / 2 / 1 / 0 / 0 | 0 / 0 / 3 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | **0 / 5 / 10 / 1 / 0** |
| dancer-mirror | 0 / 1 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | **0 / 1 / 6 / 0 / 0** |
| dialogue | 0 / 0 / 2 / 1 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 1 / 2 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | **0 / 1 / 5 / 1 / 0** |
| home-tour | 1 / 0 / 2 / 1 / 0 | 0 / 0 / 5 / 0 / 0 | 0 / 0 / 3 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 2 / 1 / 2 / 1 / 0 | 0 / 0 / 0 / 0 / 0 | **3 / 1 / 12 / 2 / 0** |
| man-cups | 0 / 3 / 1 / 2 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 2 / 3 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 3 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | **0 / 5 / 9 / 2 / 0** |
| man-in-mirror | 0 / 0 / 2 / 2 / 0 | 0 / 0 / 0 / 2 / 0 | 2 / 0 / 2 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | **2 / 0 / 9 / 4 / 0** |
| phone | 2 / 0 / 1 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | **2 / 0 / 7 / 0 / 0** |
| pouring-olives | 1 / 0 / 2 / 1 / 0 | 0 / 0 / 1 / 0 / 0 | 2 / 0 / 3 / 1 / 0 | 0 / 0 / 3 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | 1 / 0 / 2 / 1 / 0 | **4 / 0 / 13 / 3 / 0** |
| skateboarder | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | **0 / 0 / 7 / 0 / 0** |
| watchmaker | 0 / 0 / 1 / 1 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 1 / 1 / 1 | 0 / 0 / 0 / 3 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 1 / 0 | **0 / 0 / 2 / 6 / 1** |
| weird-blocks | 0 / 3 / 1 / 5 / 0 | 0 / 0 / 0 / 0 / 0 | 2 / 4 / 4 / 2 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 0 / 2 / 0 / 0 | **2 / 7 / 7 / 7 / 0** |
| woman-apple | 1 / 7 / 1 / 1 / 0 | 0 / 0 / 1 / 0 / 0 | 1 / 1 / 3 / 1 / 0 | 0 / 1 / 2 / 1 / 0 | 0 / 0 / 2 / 0 / 0 | 0 / 0 / 1 / 1 / 0 | **2 / 9 / 10 / 4 / 0** |
| woman-car | 1 / 2 / 3 / 2 / 0 | 0 / 0 / 0 / 0 / 0 | 0 / 1 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | 0 / 0 / 1 / 0 / 0 | **1 / 3 / 7 / 2 / 0** |
| **TOTAL** |  |  |  |  |  |  | **21 / 45 / 114 / 34 / 2** |

## Run stats

| Run | Model | Reasoning | Calls | Errors | Cost |
|---|---|---|---|---|---|
| 2026-08-14_google-gemini-3.6-flash | google/gemini-3.6-flash | no | 84 | 0 | $0.53 |
| 2026-08-14_qwen-qwen3.8-max | qwen/qwen3.8-max | yes | 84 | 0 | $4.42 |
| 2026-08-14_gemini-pro-latest | ~google/gemini-pro-latest | yes | 84 | 0 | $2.15 |
| 2026-08-14_gemma-4-31b | google/gemma-4-31b-it | yes | 84 | 0 | $0.11 |
| 2026-08-14_twelvelabs-pegasus1.5 | twelvelabs/pegasus1.5 | no | 84 | 0 | $0.00 |

Notes:
- `!` = response did not parse; `?` = call missing.
- qwen3.8-max `_long-scene` used a 7.0MB compressed variant (Alibaba 10MB request cap); gemini-3.6-flash used the original 11.3MB file; gemini-pro-latest used the 8.7MB re-compressed file now in `00 test videos/`.
- qwen3.8-max contact-interaction role used reworded prompt ("clip through" vs "penetration") after Alibaba content-filter rejections; gemini-3.6-flash used the original wording; gemini-pro-latest used the reworded prompt.
- Verdict classification pending in each run's review.md.