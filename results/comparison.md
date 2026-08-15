# Model comparison: findings per video × role

Cell format: gemini-pro-latest / gemma-4-31b-it / gemini-3.6-flash / meta/muse-spark-1.2 / qwen3.8-max / twelvelabs/pegasus1.5. Runs: gemini-pro-latest (2026-08-14_gemini-pro-latest), gemma-4-31b-it (2026-08-14_gemma-4-31b), gemini-3.6-flash (2026-08-14_google-gemini-3.6-flash), meta/muse-spark-1.2 (2026-08-14_muse-spark-1.2), qwen3.8-max (2026-08-14_qwen-qwen3.8-max), twelvelabs/pegasus1.5 (2026-08-14_twelvelabs-pegasus1.5).

| Video | baseline generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence | total |
|---|---|---|---|---|---|---|---|
| _long-scene | 3 / 2 / 2 / 3 / 6 / 1 | 1 / 0 / 1 / 1 / 3 / 0 | 3 / 0 / 0 / 2 / 1 / 0 | 1 / 0 / 1 / 0 / 0 / 0 | 2 / 0 / 1 / 2 / 1 / 0 | 0 / 0 / 0 / 0 / 2 / 0 | **10 / 2 / 5 / 8 / 13 / 1** |
| child-marbles | 1 / 1 / 0 / 2 / 3 / 0 | 3 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 2 / 0 | 3 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | **10 / 1 / 0 / 2 / 5 / 0** |
| dancer-mirror | 1 / 0 / 0 / 0 / 1 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | **6 / 0 / 0 / 0 / 1 / 0** |
| dialogue | 2 / 1 / 0 / 1 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 1 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | **5 / 1 / 0 / 1 / 1 / 0** |
| home-tour | 2 / 1 / 1 / 1 / 0 / 0 | 5 / 0 / 0 / 0 / 0 / 0 | 3 / 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 2 / 1 / 2 / 1 / 1 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | **12 / 2 / 3 / 2 / 1 / 0** |
| man-cups | 1 / 2 / 0 / 3 / 3 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 3 / 0 / 0 / 3 / 2 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 3 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 2 / 0 / 0 | **9 / 2 / 0 / 8 / 5 / 0** |
| man-in-mirror | 2 / 2 / 0 / 2 / 0 / 0 | 0 / 2 / 0 / 1 / 0 / 0 | 2 / 0 / 2 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 1 / 0 / 0 | **9 / 4 / 2 / 4 / 0 / 0** |
| phone | 1 / 0 / 2 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | **7 / 0 / 2 / 0 / 0 / 0** |
| pouring-olives | 2 / 1 / 1 / 2 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 3 / 1 / 2 / 1 / 0 / 0 | 3 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | 2 / 1 / 1 / 0 / 0 / 0 | **13 / 3 / 4 / 3 / 0 / 0** |
| skateboarder | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | **7 / 0 / 0 / 0 / 0 / 0** |
| watchmaker | 1 / 1 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 1 / 1 / 0 / 0 / 0 / 1 | 0 / 3 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 0 / 1 / 0 / 0 / 0 / 0 | **2 / 6 / 0 / 0 / 0 / 1** |
| weird-blocks | 1 / 5 / 0 / 1 / 3 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 4 / 2 / 2 / 2 / 4 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | **7 / 7 / 2 / 3 / 7 / 0** |
| woman-apple | 1 / 1 / 1 / 0 / 7 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 3 / 1 / 1 / 0 / 1 / 0 | 2 / 1 / 0 / 0 / 1 / 0 | 2 / 0 / 0 / 0 / 0 / 0 | 1 / 1 / 0 / 0 / 0 / 0 | **10 / 4 / 2 / 0 / 9 / 0** |
| woman-car | 3 / 2 / 1 / 0 / 2 / 0 | 0 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 1 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 / 0 | **7 / 2 / 1 / 0 / 3 / 0** |
| **TOTAL** |  |  |  |  |  |  | **114 / 34 / 21 / 31 / 45 / 2** |

## Run stats

| Run | Model | Reasoning | Calls | Errors | Cost |
|---|---|---|---|---|---|
| 2026-08-14_gemini-pro-latest | ~google/gemini-pro-latest | yes | 84 | 0 | $2.15 |
| 2026-08-14_gemma-4-31b | google/gemma-4-31b-it | yes | 84 | 0 | $0.11 |
| 2026-08-14_google-gemini-3.6-flash | google/gemini-3.6-flash | no | 84 | 0 | $0.53 |
| 2026-08-14_muse-spark-1.2 | meta/muse-spark-1.2 | yes | 84 | 0 | $1.11 |
| 2026-08-14_qwen-qwen3.8-max | qwen/qwen3.8-max | yes | 84 | 0 | $4.42 |
| 2026-08-14_twelvelabs-pegasus1.5 | twelvelabs/pegasus1.5 | no | 84 | 0 | $0.00 |

Notes:
- `!` = response did not parse; `?` = call missing.
- qwen3.8-max `_long-scene` used a 7.0MB compressed variant (Alibaba 10MB request cap); gemini-3.6-flash used the original 11.3MB file; gemini-pro-latest used the 8.7MB re-compressed file now in `00 test videos/`.
- qwen3.8-max contact-interaction role used reworded prompt ("clip through" vs "penetration") after Alibaba content-filter rejections; gemini-3.6-flash used the original wording; gemini-pro-latest used the reworded prompt.
- Verdict classification pending in each run's review.md.