# Final manuscript generation pipeline contract — v2.9

This contract is authoritative for final manuscript assembly. It is a targeted pipeline correction; it does not redesign the application UI or replace the existing staged architecture.

## 1. Evidence lock
- `includedRecords` is the complete final evidence set: every final INCLUDE study and no excluded/unresolved study.
- Never truncate `includedRecords` for manuscript evidence, PRISMA, study counts, references, Results, synthesis, Discussion, or Conclusions.
- If an expensive AI operation needs a cap, create a separate `synthesisInputRecords` processing variable. That variable must never replace or mutate `includedRecords`.
- The manuscript's actual included-study count is always `includedRecords.length`.
- Changing the final included set must change all evidence-derived manuscript outputs accordingly.

## 2. Title generation
Generate about five candidate titles from the actual included records and available `StudyCharacteristic` fields. Use record IDs, titles, abstracts, authors, years, and stored characteristics only where present in the data model. Candidates must be concise, evidence-bounded, review-appropriate, and free of AI/software terminology. Never concatenate keywords into a title. If generation fails, retain the configured review title. The selected candidate becomes the single manuscript title across preview and every export.

Prefer adding title generation to an existing synthesis request rather than making an unnecessary extra AI call.

## 3. Abstract generation
Generate one continuous publication-style paragraph, maximum 300 words, preferably 200–280 words. Internally cover background, one overarching objective, actual methods, results from final included evidence, and a cautious conclusion, but do not display section labels. Do not concatenate RQ1/RQ2/etc. into the objective. Do not reproduce protocol text mechanically.

Methods may mention only procedures actually performed: systematic review approach, actual search sources, predefined eligibility screening, final included count, and narrative/thematic synthesis where applicable. Never invent full-text retrieval/assessment, quality appraisal, risk of bias, meta-analysis, effect sizes, GRADE, statistical pooling, reviewer procedures, or inter-rater reliability. Never mention AI screening, language models, APIs, software, or application names.

Results are evidence-locked to `includedRecords`, stored `StudyCharacteristic`/synthesis evidence, and the quantitative findings extracted from the complete available evidence for each included record. Explicitly reported statistics in the records must not be discarded: report relevant percentages, sample sizes, means/medians, ranges, effect estimates, p-values, confidence intervals, test statistics, model-performance metrics, and other numerical findings exactly as supported. Do not fabricate or infer statistics. Do not write study-by-study sentences; integrate quantitative findings into cross-study Results prose and cite the supporting records. The conclusion must state only what the included evidence collectively supports.

The validator must check: one paragraph; <=300 words; complete sentence ending; no malformed protocol-question concatenation; no unnecessary RQ labels; no AI/software screening terminology or AI/abstract-provenance disclosure; no unsupported claims; no fabricated statistics; representative quantitative findings included when available; and dynamic included count equal to `includedRecords.length`. If AI output fails, regenerate once with a stricter prompt; otherwise use a deterministic evidence-grounded fallback.

There must be exactly one authoritative abstract string shared by on-screen manuscript, Markdown, DOCX, preview, and downloadable manuscript. Citation formatting, if citations occur, is applied after evidence identification by the central citation formatter.


## 3A. Mandatory quantitative extraction pass before manuscript writing

Before generating any manuscript prose, execute a quantitative evidence extraction pass over every record in `includedRecords` that has an abstract or other supplied evidence. Do not rely on the general synthesis prompt to discover statistics opportunistically.

Create `quantitativeFindings` with one evidence-linked entry per extracted finding and `hasQuantitativeFindings` for every included record. The extraction must inspect the complete abstract and capture reported numerical results including sample sizes, means/medians, percentages, rates, ranges, comparative changes, effect estimates, p-values, test statistics, confidence intervals, correlations, regression coefficients, and model-performance metrics.

Pass the resulting `quantitativeFindings` collection into Abstract, Results, Discussion, and synthesis generation. If at least one materially relevant quantitative finding exists, the final manuscript MUST contain concrete numerical reporting in the Abstract and Results. If five or more distinct findings exist, strongly prefer a formal quantitative findings table.

Do not permit the manuscript generator to replace available statistics with generic phrases. For example, if an abstract reports `27% reduction (p = 0.013)`, the manuscript should report that numerical result with the appropriate citation rather than merely saying `a significant reduction was observed`.

The validator must compare the extracted quantitative findings with the final manuscript. If extractable statistics exist but no corresponding statistics appear in the Abstract and Results, regenerate the affected sections or use the deterministic evidence-grounded renderer.

## 4. Keywords
Generate approximately 5–8 topic-specific keywords from the review topic and final included evidence: protocol title/topic, included titles/abstracts, meaningful stored characteristics, and recurring evidence concepts. Prefer subject-matter terms. Do not use generic methodology terms such as Systematic Literature Review, Evidence Synthesis, Narrative Synthesis, PRISMA, or Research Methodology unless genuinely required by the target journal. Do not hard-code maritime or other domain keywords.

## 5. Section 3 - Findings and Results
The unit of analysis is the complete bibliometric and systematic evidence set.
Results must use journal-style subsections: Publication Trends, Influential Contributors, Emerging Themes, and Thematic Clusters.

## 6. Section 3.4 — Thematic Clusters (or Narrative Synthesis)
Keep Section 3.4 concise and journal-like. Target approximately 600–1,000 words maximum, using the shorter end when evidence is limited. Start with a 50–100 word introductory paragraph, followed by approximately 3–5 thematic subsections only when supported by the evidence. Fewer themes are required when evidence supports fewer; one dominant theme is acceptable.

Each thematic subsection should normally be 150–250 words. Do not repeat Results or Discussion, exhaustively describe every paper, or force every study into prose. Use integrated cross-study synthesis: introduce the pattern, combine evidence from multiple records, compare/contrast where supported, interpret cautiously, and identify gaps only when the included evidence supports them.

Theme headings should normally be 2–6 words and concise noun phrases, such as `System-Level Decarbonisation`, `Alternative Fuel Pathways`, `Technological Innovation`, `Fleet and Infrastructure Transition`, or `Operational Decarbonisation`. Do not use sentence-like headings or mini-abstracts.

Themes must be discovered from the actual included evidence and stored characteristics/synthesis. Do not use keyword classifiers, title substring rules, or hard-coded domain categories.

AI synthesis output should identify supporting evidence using actual `supportingRecordIds`. Every ID must exist in `includedRecords`. The AI must not format citations; the application applies the selected citation style after evidence identification.

## 7. Findings and Results, Discussion, and Conclusion
Results use the complete final included evidence set for descriptive reporting. Apply `quantitative-findings-contract.md` and report substantive numerical findings explicitly present in the records. 

Discussion should use concise manuscript subsections: Future Research Directions, and Implications. Interpret Results rather than repeat them, and do not exaggerate evidence certainty.

Conclusion may use only `includedRecords`, Results, and narrative/thematic synthesis. Do not introduce new evidence or stronger claims than the included evidence supports.

## 8. Evidence-bound methods restriction
Do not invent full-text retrieval, full-text assessment, quality appraisal, risk of bias, meta-analysis, or other procedures that were not actually performed. These internal workflow boundaries are not to be inserted into the manuscript narrative as procedural caveats. In particular, do not state that full-text eligibility was not performed, that evidence was abstract-only, or that the manuscript was generated from abstracts. Present the supported study findings directly in conventional journal language.

## 9. Manuscript-neutral language
The manuscript must not mention AI screening, AI-assisted screening, artificial intelligence screening, language models, generative AI, screening software, API calls, Gemini, OpenAI, ScholarPen, or any equivalent generation-mechanism disclosure. It must also not state that the manuscript was generated from abstracts or abstract records. Use neutral methodological language describing the review and the evidence actually reported by the included studies.

## 10. Appendices
### Appendix A — List of Included Studies
Render the final included studies as a list or table. Use the central citation formatter and persisted citation style for the full list of included studies. Do not ask AI to invent criteria or search strings as appendices.

## 11. Screening audit
When a screening audit table is intended to represent all screened decisions, use the complete screened-record ledger from application state, not merely `includedRecords`. Final INCLUDE studies remain the only evidence eligible for Results, synthesis, Discussion, and Conclusions.

## 12. Citation/export consistency
Use the central citation formatter and persisted citation style. Do not embed citation-style decisions in AI prompts. The same title, abstract, keywords, evidence content, appendices, citation style, references, and PRISMA representation must be used in preview and exports.

## 13. Final validation
Before final manuscript generation validate:
- `includedRecords` contains all final INCLUDE studies and is not truncated;
- PRISMA included count equals `includedRecords.length`;
- title candidates use actual included evidence and selected title is propagated everywhere;
- abstract is one paragraph, <=300 words, complete, evidence-locked, and free of unsupported protocol/full-text/AI claims;
- Section 3.2 has no year distribution, no forbidden classifier, no impossible study counts, and only actual stored characteristics;
- Section 3.4 is concise, theme-supported, record-ID grounded, and not an annotated bibliography;
- Results/Discussion/Conclusion contain all materially relevant quantitative findings explicitly reported in the included evidence when supported;
- quantitativeFindings was built before manuscript prose generation;
- every included record with an abstract was inspected for numerical findings;
- when extractable statistics exist, Abstract and Results contain concrete numerical reporting;
- no generic significance wording replaces an available reported statistic;
- no screening/full-text procedural disclaimer appears in manuscript prose unless explicitly requested by the user;
- every manuscript statistic is traceable to an included record or an explicitly performed analysis;
- no fabricated statistics, unsupported significance labels, or invented effect estimates are present;
- Appendix A exactly reflects stored eligibility criteria;
- Appendix B reproduces exact stored search strings and source metadata;
- no unsupported full-text stage is claimed;
- manuscript language contains no AI/software terminology;
- TypeScript/application pipeline remains structurally compatible with existing stages and exports.

The final manuscript is a rendering of the stored review state, not a new evidence-generation process.


## 14. Publication presentation override

For final manuscript rendering, also apply `journal-manuscript-presentation-contract.md`. It is authoritative for journal-style prose, section architecture, substantial Introduction, framework/PICOC justification tables, eligibility criteria presentation, exact search strategy presentation, PRISMA figure rendering, characteristics validation, table/figure captions, appendices, and the prohibition on bullet-point manuscript body formatting.

## 15. Introduction citation requirement

The Introduction MUST follow `introduction-citation-contract.md`. Substantive literature claims in the Introduction require validated in-text citations. Use actual bibliographic records and the persisted citation style. Do not fabricate citations, authors, years, DOI, or unsupported field claims.

The Introduction should progress through contextual background, current literature, major approaches/findings, unresolved issues, knowledge gap, review rationale, and objectives/research questions. It must be continuous academic prose rather than bullet points.

Every citation must resolve to an actual permitted record, and the final reference list must contain every cited Introduction record. If evidence is insufficient for a proposed claim, omit or qualify the claim instead of generating a citation.

## 16. Introduction versus Results/Discussion citation architecture

Apply `introduction-results-citation-separation.md`. The manuscript must not mechanically repeat Introduction citations in Results or Discussion. Assign internal citation roles and use `background`/`gap` citations primarily for the Introduction, while `finding`/`synthesis` citations support Results and Discussion. Repeat a source only when it genuinely supports a claim in the later section.

A source cited only for background or the research gap remains in the reference list even if it is absent from Results and Discussion. The final reference list therefore represents all manuscript citations, not only studies cited in Results.

## 17. Conversation title synchronization

After manuscript assembly, the selected manuscript title is the single authoritative title. If a supported ChatGPT conversation-title action is available, set the chat title to exactly that manuscript title. Never use a separate generated conversation title. If no title action is available, do not falsely report that the title was changed.
