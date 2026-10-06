# Journal Manuscript Presentation Contract — v2.6

This contract is authoritative for final manuscript presentation. It concerns **format, organization, prose quality, methodological transparency, figures, tables, appendices, and publication-style rendering**, not the scientific content of any particular review.

## 1. Publication-style manuscript, not application report

The final output MUST read and appear like a complete journal manuscript. It must not resemble a dashboard, workflow report, checklist, AI report, or application summary.

Use continuous academic prose under manuscript headings. The body of the manuscript MUST NOT use bullet points, dash lists, card-style blocks, or numbered list fragments merely because the internal data are arrays. Convert stored information into coherent prose and publication tables. Numbered lists are permitted only where a journal-style appendix or explicit criteria presentation requires them.

The manuscript must use a stable scholarly hierarchy:

Title
Abstract
Keywords
1. Introduction
2. Methodology
3. Findings and Results
4. Discussion
5. Conclusions
Appendix A. List of Included Studies
References

Do not add application-stage labels such as "Stage 1", "AI screening", "Evidence Budget", "Processing Pool", "Workflow State", or "ScholarPen Output" to the manuscript.

## 2. Manuscript architecture

Unless the evidence or journal target requires a justified variation, use:

### 1. Introduction

Write an extensive and deeply substantial introduction, targeting approximately 2 pages or 3000 words in length. It must contain multiple deeply connected paragraphs that move from the broad research context to the specific topic, define important concepts where necessary, comprehensively synthesize the major directions already represented in the included literature, thoroughly identify fragmentation or unresolved questions, establish the knowledge gap, explain why a systematic review is warranted, state the review objective, state the research questions, and briefly explain the organization of the article.

The Introduction MUST be the longest section before the Methods and should provide an exhaustive academic rationale. Do not manufacture a gap. The gap must be supported by the included literature or by the user's stored protocol.

Do not turn the Introduction into an annotated bibliography. Integrate studies around ideas, developments, methods, outcomes, disagreements, and gaps.

### 2. Methodology

Use journal-style subsections:

2.1 Review Design and PRISMA Framework
2.2 Information Sources and Search Strategy
2.3 Eligibility Criteria and Study Selection
2.4 Data Extraction and Bibliometric Analysis

Only include a subsection when the underlying information exists. If the user requests bibliometric components, ensure tools like VOSviewer or RStudio are contextually mentioned in Data Extraction.

### 3. Findings and Results

Use journal-style subsections modeled after high-quality systematic and bibliometric reviews:

3.1 Publication Trends
3.2 Influential Contributors
3.3 Emerging Themes
3.4 Thematic Clusters (or Narrative Synthesis)

Add additional descriptive subsections only when actual evidence supports them. Do not create empty template sections.

### 4. Discussion

Use:

4.1 Future Research Directions
4.2 Implications

Discussion must interpret the Results, synthesize mechanisms and boundary conditions, and should not become a second Results section or an annotated bibliography.

### 5. Conclusions

Use concise continuous prose. Do not introduce new findings, citations, statistics, or recommendations unsupported by the review evidence.

## 3. Abstract

The Abstract must be one continuous paragraph, normally 200–280 words and never more than 300 words.

It should naturally cover background, objective, methods, principal results, and conclusion without displaying labels such as "Background:" or "Methods:".

It must report actual review counts and actual information sources where available. It must not claim full-text assessment, risk-of-bias assessment, meta-analysis, quantitative pooling, reviewer procedures, inter-rater reliability, or other procedures that did not occur.

## 4. Introduction depth requirement

The final manuscript MUST produce a highly detailed Introduction of approximately 2 pages or 3000 words. It must not consist of only a few generic paragraphs.

Before generating the Introduction, build an evidence map containing:
- broad context;
- core concepts/definitions where supported;
- major research approaches represented in the evidence;
- major outcome dimensions;
- methodological or technological development;
- unresolved or fragmented areas;
- explicit review gap;
- objective and research questions.

Then write the Introduction as connected academic prose. Use citations from the relevant included evidence rather than repeatedly citing one or two records.

The Introduction should explain **why the review is necessary**, not merely state that literature exists.

## 5. PICOC / framework justification table

When a formulation framework is stored, the final manuscript MUST present the framework explicitly in the Methods section as a publication-style table.

For PICOC, use:

| Element | Definition in this review | Review-specific formulation | Justification |
|---|---|---|---|
| Population | ... | ... | ... |
| Intervention | ... | ... | ... |
| Comparison | ... | ... | ... |
| Outcome | ... | ... | ... |
| Context | ... | ... | ... |

The values MUST come from the stored protocol/framework state. Do not fabricate values solely to populate the table.

If a framework element is genuinely absent from the stored protocol, render it as unavailable rather than inventing a domain-specific value. If the user has not yet confirmed the framework, the manuscript must not silently present an AI-generated framework as final.

The table must have a formal caption such as:

**Table 1. PICOC framework and justification used to formulate the review questions and search strategy.**

Renumber subsequent tables dynamically.

## 6. Inclusion and exclusion criteria

The Methods section MUST explicitly describe eligibility criteria in prose and MUST provide a publication-style table when stored criteria are structured enough to support it.

Recommended presentation:

**Table 2. Inclusion and exclusion criteria used for study selection.**

| Criterion | Inclusion | Exclusion |
|---|---|---|
| Population/engine/domain | exact stored criterion | exact stored exclusion |
| Intervention/exposure | exact stored criterion | exact stored exclusion |
| Outcomes | exact stored criterion | exact stored exclusion |
| Publication type | exact stored criterion | exact stored exclusion |
| Language | exact stored criterion | exact stored exclusion |
| Publication period | exact stored criterion | exact stored exclusion |

Do not invent missing criteria. If the stored protocol uses a different structure, preserve that structure rather than forcing the example table.

Appendix A MUST reproduce the exact stored inclusion and exclusion criteria. The Appendix is the audit copy; the Methods prose is the narrative explanation.

## 7. Search strategy

The Methods section MUST state the actual information source(s), search date(s) when stored, search fields when stored, publication limits, and search strategy.

The exact accepted search string MUST be presented in Appendix B. It must never be reconstructed from memory or rewritten during manuscript generation.

If Scopus is the only actual source, the manuscript must say Scopus, not Scopus and Web of Science.

If no actual search date or retrieval count was stored, do not invent one.

If the query was generated but not actually executed, label it as the planned search strategy rather than claiming a database retrieval event.

## 8. PRISMA figure

A final manuscript MUST contain a real publication-style PRISMA flow diagram whenever screening data exist.

The diagram must be rendered as a figure, preferably SVG or high-resolution PNG, and embedded in the manuscript/export. A prose sequence of arrows is NOT an acceptable substitute.

Use actual current-state counts only. At minimum, when available:

Identification: records identified from actual database/source(s)
Removed before screening: actual duplicates and other recorded removals
Screening: records screened
Exclusions: actual screening exclusions
Included: final INCLUDE records

Do not insert full-text retrieval/assessment stages unless they actually occurred.

Do not display Web of Science unless Web of Science records were actually searched/imported and provenance supports that source.

The diagram must reconcile mathematically and use the screening ledger as its source of truth.

Caption example:

**Figure 1. PRISMA 2020 flow diagram of the study identification, screening, and inclusion process.**

If the workflow is title/abstract bounded, use a clearly adapted PRISMA 2020 representation and state the boundary in the Methods/Results text. Never create a false full-text stage.

## 9. Characteristics table

The Characteristics of Included Studies table MUST be generated from the current final included records and valid stored StudyCharacteristic values only.

Do not use stale characteristics from another review, prior topic, demonstration data, or an unrelated evidence set.

Before rendering, validate each characteristic record against the current `reviewId` and included record IDs. If a characteristic record refers to another review, another topic, or a record not in the current included evidence, quarantine it and do not use it.

Do not infer characteristics from title keywords merely to fill a table.

Use one study/record as the unit of analysis. Counts must never exceed the number of included studies for a single-valued characteristic.

If no valid characteristics are stored, rebuild them from the current included bibliographic evidence only when the available fields genuinely support extraction. Otherwise omit unsupported characteristic categories rather than displaying corrupted or invented data.

## 10. Results writing

Results must be written as connected academic prose around actual evidence patterns. Apply `quantitative-findings-contract.md` to ensure explicitly reported numerical findings are extracted and reported rather than omitted. Where abstracts or other supplied record evidence report p-values, effect estimates, percentages, sample sizes, confidence intervals, means, ranges, test statistics, or model metrics, incorporate those values into the Results when they answer the review questions. Do not replace concrete results with vague phrases such as “significant improvements were observed” when the actual reported value is available.

Do not produce:
- bullet summaries of papers;
- one-study-per-bullet output;
- one-sentence study inventories;
- artificial numeric distributions;
- fabricated experimental results;
- unsupported effect sizes.

Where useful, follow the reference-manuscript pattern of introducing the result in prose, then presenting a figure or table, then interpreting the displayed evidence in prose.

## 10A. Quantitative findings presentation

When the included evidence contains reportable numerical results, the manuscript must include a quantitative-evidence narrative within Results. It should identify the principal outcome measures and report representative magnitudes and statistical evidence. Explicitly reported significant and non-significant findings must be distinguished.

When at least five distinct quantitative findings are available, a publication-style table may be used with columns such as Study, Outcome/measure, Reported result, Statistical evidence, and Context/comparator. Use normal citation formatting; do not expose internal record IDs.

No pooled effect, overall mean, confidence interval, p-value, or meta-analytic result may be created unless a valid analysis was explicitly performed. Heterogeneous study results should be compared narratively.

The manuscript must present these findings directly as scholarly evidence and must not disclose that the prose was generated by AI or that the review manuscript was generated from abstracts.

## 11. Narrative and thematic synthesis

Thematic synthesis should normally use 3–5 evidence-supported themes, fewer when appropriate. Each theme should be a concise noun phrase rather than a sentence.

Each theme should integrate multiple studies where the evidence allows, compare findings, explain relationships, identify methodological differences, and state gaps cautiously.

Do not turn the synthesis into a list of citations. Do not force every paper into every theme.

## 12. Tables and figures

All tables and figures must be manuscript objects, not UI cards.

Every table requires:
- dynamic table number;
- formal caption;
- consistent column headings;
- readable academic formatting;
- source/evidence note when appropriate.

Every figure requires:
- dynamic figure number;
- formal caption;
- readable publication-style rendering;
- consistent placement near its first discussion.

Recommended core objects:
1. PRISMA flow diagram.
2. Framework/PICOC justification table.
3. Inclusion/exclusion criteria table.
4. Characteristics of included studies table.
5. Thematic synthesis table when supported by actual synthesis data.

Do not create a thematic performance/comparison table unless the evidence actually contains the fields required for such a comparison.

## 13. Discussion and conclusion style

The Discussion must be written in continuous paragraphs and should synthesize rather than enumerate.

4.1 should answer what the review found collectively.

4.2 should explain how the findings relate to methodological, technological, contextual, or theoretical differences visible in the evidence.

4.3 should identify implications supported by the evidence.

4.4 should identify research gaps and future directions grounded in the evidence.

4.5 should transparently describe limitations of the evidence base and review process without inventing shortcomings.

The Conclusion should be shorter than the Discussion and should provide a clear closing synthesis.

## 14. References

References must be generated from the final included evidence actually cited in the manuscript and formatted consistently using the selected citation style.

Do not invent missing bibliographic details. Do not add unrelated references merely to make the reference list longer.

The reference section must be a normal journal-style bibliography, not a JSON object, bullet-card list, or internal record dump.

## 15. Appendices

### Appendix A. Eligibility Criteria

Render the exact stored inclusion and exclusion criteria. If the source stores arrays, numbered items are acceptable in this appendix.

### Appendix B. Search Strategy and Search Strings

For every actual stored source, render:

Database/source
Search fields
Search date
Limits/filters
Exact stored search string
Records retrieved, only when actually stored/verified

Do not rewrite the query.

## 16. Cross-component consistency audit

Before final rendering, verify all of the following:

1. Review ID is identical across protocol, records, characteristics, screening, PRISMA, synthesis, and manuscript state.
2. Title belongs to the current review.
3. Search source provenance belongs to the current review.
4. Eligibility criteria belong to the current review.
5. Search strings belong to the current review.
6. Screening decisions belong to the current review.
7. Characteristics belong to the current included records.
8. Synthesis supportingRecordIds belong to current included records.
9. PRISMA counts derive from current screening state.
10. No Web of Science source is displayed unless actually present.
11. No full-text stage is displayed unless actually performed.
12. No stale demonstration/example data are used.
13. No corrupted characteristic/synthesis table is silently reused.
14. Manuscript prose contains no internal application terminology.
15. Material quantitative findings present in included evidence are represented in Results/Discussion when relevant.
16. No manuscript statistic is unsupported or generated merely from metadata.

If a stored field fails this audit, exclude the invalid field from manuscript generation and report the field as needing reconstruction rather than silently replacing it with invented data.

## 17. Final rendering principle

The final manuscript should visually resemble a conventional published systematic review: substantial Introduction, explicit Methods, formal tables, a real PRISMA figure, coherent Results, thematic Discussion, Conclusion, appendices, and references.

The manuscript must not visually resemble a software-generated checklist or a sequence of bullet points. It must read as a conventional, publication-ready full manuscript and must not disclose its AI generation mechanism or abstract-record provenance unless the user explicitly requests that disclosure.

## 15. Citation role separation between Introduction and Results

The Introduction is a scholarly rationale and should primarily cite literature establishing context, prior approaches, limitations, and the research gap. Results and Discussion should cite the records that provide the actual findings and interpretations. Do not repeat an Introduction citation in Results merely because it was already cited. Repeat it only when the same record supports a substantive finding or interpretation in that section.

The manuscript should therefore avoid redundant citation patterns in which the same study is described in the Introduction and then mechanically restated in Results. The Introduction should establish the problem; Results should report the evidence found by the review.

## 16. Conversation title synchronization

Once the final manuscript title is selected, it becomes the authoritative conversation title. When the ChatGPT environment provides a supported conversation-title action, the assistant should apply the exact manuscript title to the chat. If the environment does not provide such an action, the workflow must not claim the title was changed.
