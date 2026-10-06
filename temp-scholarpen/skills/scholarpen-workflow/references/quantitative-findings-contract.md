# Quantitative Findings and Publication-Style Evidence Contract — v2.8

## 1. Purpose
The final manuscript must report substantive quantitative findings that are explicitly present in the bibliographic evidence available to ScholarPen. Abstract records may contain useful numerical results, and those reported results are evidence: they must not be discarded merely because they appear in the abstract field.

The manuscript is rendered as a conventional journal article. It must not disclose its generation mechanism, use the terms AI-generated/AI-assisted, or state that the manuscript was generated from abstracts. Internal evidence provenance may distinguish metadata, abstract-reported findings, and verified full-text evidence for audit purposes, but that provenance language must never appear in the manuscript unless the user explicitly requests it.

## 2. Quantitative finding extraction
For every included record with an abstract or other supplied evidence, inspect the complete available text for explicitly reported quantitative findings, including where applicable:
- sample size (`n`), cohort size, observations, experiments, cases, vessels, sites, or datasets;
- means, medians, proportions, percentages, rates, ranges, standard deviations, standard errors, or other descriptive statistics;
- between-group differences, changes from baseline, relative/absolute changes, percentage increases or reductions, ratios, odds/risk measures, or other effect estimates;
- statistical tests and their reported statistics (e.g., t, F, chi-square, z, U, r, rho, beta, regression coefficients);
- p-values and explicit statements of statistical significance/non-significance;
- confidence intervals or other uncertainty intervals;
- model-performance metrics such as R², adjusted R², RMSE, MAE, accuracy, sensitivity, specificity, AUC, precision, recall, or similar metrics when reported;
- reported experimental, operational, environmental, clinical, engineering, or process measurements with numerical values and units;
- rankings, threshold values, optimum values, ranges, or comparative values when they are actual reported results rather than inferred calculations.

Do not extract numbers that are merely bibliographic metadata, publication years, page numbers, DOI fragments, search counts, protocol dates, or other non-result quantities as study findings.

## 3. Preserve the exact evidence meaning
For every quantitative finding retain, where available:
- `recordId`;
- the outcome/measure name;
- value or value range;
- unit;
- comparator or reference condition;
- direction of effect/change;
- statistical test/statistic;
- p-value;
- confidence interval;
- sample size;
- the wording/context needed to interpret the result;
- whether the source explicitly describes the finding as significant or non-significant.

Never infer a p-value, significance level, effect size, confidence interval, sample size, mean, or other statistic from another reported value. Never convert a qualitative claim into a quantitative claim. Never calculate a new effect size unless the user explicitly requests analysis and the supplied values support a valid calculation.

If the source says only that a result was “significant” without giving a p-value, report it as an explicitly reported significant finding without inventing a numerical p-value. If a p-value is reported, preserve it exactly enough to retain its meaning (for example, `p < 0.05`, `p = 0.013`).

## 4. Significant findings
A finding may be described as statistically significant only when the source explicitly reports significance or provides a statistical result that unambiguously establishes it under the source's stated criterion. Do not label a result significant merely because one number is larger than another.

Results prose should prioritize substantive findings that include an explicit statistical test, p-value, confidence interval, effect estimate, percentage change, or other quantitative evidence. Where several included studies report compatible measures, synthesize the direction and magnitude cautiously and cite the supporting records.

Examples of acceptable reporting patterns:
- “Across the included studies, several investigations reported reductions in X, with individual studies reporting reductions of 18% and 27% under the tested conditions.”
- “One study reported a statistically significant association (p = 0.013), while another reported no significant difference.”
- “Reported model performance ranged from R² = 0.81 to 0.94 across the studies that evaluated model fit.”

Only use such cross-study aggregation when the cited records actually contain the stated values. Do not create an overall mean, pooled effect, meta-analytic estimate, or significance test unless a valid analysis was explicitly performed.

## 5. Results section requirements
The Results section must contain a dedicated quantitative-evidence narrative when the included evidence contains reportable numerical findings. This section remains continuous journal prose and may use a formal table when the number of findings warrants it.

At minimum, where supported, Results should report:
1. the number of included records containing quantitative findings;
2. the major quantitative outcomes represented;
3. the most decision-relevant reported magnitudes/directions;
4. explicit statistically significant or non-significant findings;
5. important sample sizes or study scales when they materially contextualize the result;
6. model/performance statistics where relevant to the review question.

Do not turn Results into a one-study-per-bullet inventory. Integrate findings across studies, then cite the specific records supporting each quantitative statement.

## 6. Quantitative findings table
When at least five distinct quantitative findings are available, generate a publication-style table where appropriate. Suggested columns:

| Study | Outcome/measure | Reported result | Statistical evidence | Context/comparator |
|---|---|---|---|---|

Use the actual citation/reference format selected for the review. Do not expose internal record IDs in the manuscript. Omit columns that are unsupported across the evidence. Do not force a table when only a few findings are available.

## 7. Discussion use of statistics
Discussion should interpret the reported quantitative findings without repeating every value. Compare magnitude, direction, consistency, and methodological/contextual differences only where supported. A statistically significant finding must not automatically be described as practically important; distinguish statistical significance from magnitude or practical relevance.

When studies report conflicting statistical results, state the disagreement and identify the records involved rather than selecting a preferred result.

## 8. Abstract generation
The manuscript abstract must include the principal quantitative findings when the evidence supports them. The Results portion of the abstract should contain concrete reported numbers rather than generic phrases such as “significant improvements were observed” when the underlying records provide the actual values.

Select only a small number of representative, well-supported quantitative findings so the abstract remains within the existing 300-word limit. Never fabricate a pooled statistic.

## 9. Evidence and provenance safeguards
The internal pipeline may record whether a quantitative finding came from an abstract, supplied full text, or another verified evidence source. This is an audit property, not manuscript prose.

The final manuscript must not say:
- “based on abstracts”;
- “abstract-only evidence”;
- “generated from abstracts”;
- “AI-generated”;
- “AI-assisted”;
- “generated by ScholarPen”;
- “language model generated”; or equivalent disclosure of the generation mechanism,
unless the user explicitly requests such disclosure.

The manuscript should instead present the reported findings directly, with normal scholarly citations.

## 10. Validation
Before final rendering:
- every quantitative claim maps to one or more real included records;
- every reported value, unit, p-value, effect estimate, confidence interval, sample size, and model metric can be traced to supplied evidence;
- no number has been inferred solely from a title, keyword, citation metadata, or general knowledge;
- significance labels match the source wording/statistical evidence;
- cross-study ranges/counts are mathematically derived from extracted values only when appropriate;
- no pooled effect or meta-analysis is implied without an actual analysis;
- the abstract contains representative quantitative findings when available;
- Results contains substantive numerical findings when available;
- Discussion interprets rather than exaggerates quantitative evidence;
- the manuscript contains no AI/abstract-provenance disclosure unless explicitly requested by the user.

## 11. Mandatory pre-manuscript quantitative extraction gate

Quantitative extraction is a required stage immediately before final manuscript generation. It is not optional, and it must not depend on whether a generic AI synthesis happens to notice numbers.

For every final included record that contains an abstract, create a structured `quantitativeFindings` collection by inspecting the complete abstract text. The collection must be generated before writing the manuscript and must be passed into the manuscript-generation context. Each record should be explicitly marked as `hasQuantitativeFindings: true` or `false`.

For records marked true, preserve all materially relevant reported numerical findings rather than selecting only one headline value. At minimum inspect the abstract for: sample size, primary outcome values, comparative changes, percentages, rates, ranges, statistical tests, p-values, confidence intervals, effect estimates, correlations, regression/model coefficients, and model-performance statistics.

The manuscript generator MUST use this collection in four places when supported by the evidence:
1. Abstract — include representative numerical findings.
2. Results — provide a dedicated quantitative-results narrative and, where sufficient findings exist, a formal quantitative findings table.
3. Discussion — interpret the magnitude, direction, consistency, and statistical significance of the reported findings.
4. Evidence synthesis — use actual reported values to compare findings across studies without creating pooled statistics.

A generic sentence such as `significant improvements were reported`, `studies showed positive effects`, or `several studies reported changes` is insufficient when the underlying abstract contains numerical results. The numerical result must be stated.

If the abstract contains a statistic but its context is ambiguous, retain the statistic with the narrowest wording supported by the source rather than dropping it. If no quantitative finding is present, mark the record false; do not manufacture a value.

The final-manuscript validator MUST fail or trigger regeneration when included records contain extractable quantitative findings but the Abstract and Results contain no corresponding numerical findings.

## 12. Statistical wording and manuscript presentation

Use normal journal language. Do not describe the numerical evidence as `abstract-derived`, `abstract-only`, `abstract-based`, or `AI-extracted` in the manuscript. Do not disclose the generation mechanism.

Do not include screening-status caveats or statements about what review stages were not performed in the manuscript narrative unless the user explicitly requests such a methodological disclosure. In particular, do not insert sentences such as `Title and abstract screening retained ...`, `Full-text eligibility assessment was not performed ...`, `abstract-only evidence`, or equivalent procedural disclaimers into the manuscript.

The manuscript should present the retained evidence and reported findings directly in conventional scholarly prose.
