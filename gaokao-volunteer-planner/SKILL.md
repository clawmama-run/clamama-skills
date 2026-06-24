---
name: gaokao-volunteer-planner
description: "高考志愿填报辅助：按省份、分数、家庭、城市和职业目标生成冲稳保院校专业方案。"
---

# 高考志愿填报辅助

Use when helping a Chinese gaokao student or family choose colleges/majors, compare cities, estimate risk, or produce a 志愿填报 report.

## Safety and scope

- Be explicit: this is AI-assisted planning, not an admission guarantee.
- Do not invent official cutoffs as facts. Label estimates as estimates and recommend checking provincial exam authority data and current university admission rules.
- Prefer asking for rank/位次 if available. If only score is provided, estimate cautiously and state uncertainty.
- Account for province-specific rules, batch, subject track, 平行志愿/顺序志愿, 调剂 risk, family budget, city preference, and career target.
- Output practical Chinese explanations suitable for both student and parents.

## Fast workflow

1. Collect minimum input:
   - province: 高考省份
   - score: 预估或实际分数
   - gender: 男/女/不说明
   - family: 家庭经济情况，自然语言即可
   - optional extra: 位次、选科、想学/不想学的专业、想去/不想去的城市、职业目标、预算、是否接受调剂/外省
2. Create or update `data/current-run.json` in the user workspace.
3. If `whipflow` is available, copy `assets/workflows/gaokao/*.whip` into `whips/gaokao/` and run `whipflow run whips/gaokao/run-all.whip`.
4. If `whipflow` is not available, execute the same phases manually:
   - `setup`: profile, score/rank interpretation, province rules, strategy.
   - `research`: candidate schools, major outlook, city cost/life comparison.
   - `match`: score 冲/稳/保 candidates with transparent weights and risks.
   - `plan`: final ordered application plan with 调剂 advice.
   - `report`: parent-readable final report.
5. Write outputs under `docs/` and structured data under `data/` when the environment allows file writes.

## Output files

Recommended outputs:

- `docs/gaokao-strategy.md` — 总体策略
- `docs/school-research.md` — 候选院校调研
- `docs/major-research.md` — 专业就业分析
- `docs/city-research.md` — 城市生活成本对比
- `docs/match-analysis.md` — 多维评分与冲稳保候选
- `docs/final-plan.md` — 可直接填写的志愿顺序方案
- `docs/gaokao-final-report.md` — 给学生和家长看的综合报告
- `data/current-run.json` — 输入配置
- `data/gaokao-profile.json` — 学生画像
- `data/gaokao-matches.json` — 候选评分
- `data/gaokao-plan.json` — 最终方案数据

## Helper script

To initialize input JSON:

```bash
node gaokao-volunteer-planner/scripts/init-gaokao-run.mjs \
  --province 广东 \
  --score 612 \
  --gender 男 \
  --family "普通工薪，家里还有一个弟弟" \
  --extra "喜欢计算机，不想去东北，目标互联网大厂"
```

## References

- `references/source-workflow.md` has the original workflow overview.
- `assets/workflows/gaokao/` contains the adapted whipflow workflow files.
