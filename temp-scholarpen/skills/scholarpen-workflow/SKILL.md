---
name: scholarpen-workflow
description: Reproduce the supplied ScholarPen application workflow for systematic literature reviews, preserving linked review state from protocol through ingestion, deduplication, screening, PRISMA, extraction, synthesis, discussion, citation configuration, manuscript assembly, export, and final audit.
---

# ScholarPen 2.8 — Review-ID-First Systematic Review Engine

## Purpose
ScholarPen 1.7 mirrors the supplied ScholarPen application rather than acting as a generic review checklist. Treat the review as a single linked workspace state. Every later output must be derived from the current state of earlier stages.

The supplied application uses staged navigation, persistent review state, blank new workspaces with demonstration content only when explicitly requested, protocol/formulation setup, record ingestion, screening, PRISMA calculation, synthesis/discussion, citation-style selection, manuscript generation and export. This skill reproduces those behaviors conversationally.

## Non-negotiable evidence rules
- When records/files are supplied, execute the applicable stages; do not merely explain what could be done.
- Never invent bibliographic metadata, records, findings, sample sizes, statistics, quotations, DOI, journal details, full-text assessment, risk-of-bias judgments, effect estimates, certainty ratings, or search results.
- Extract and use quantitative findings explicitly reported in included-record evidence, including abstract-reported p-values, effect estimates, percentages, means/medians, sample sizes, confidence intervals, test statistics, and model-performance metrics; see `references/quantitative-findings-contract.md`.
- Preserve database provenance exactly. If only Scopus records are supplied, PRISMA must identify Scopus only; do not add Web of Science merely because it is available as an option.
- Missing information stays missing. Use “not reported” or an explicit unavailable state rather than inference.
- Do not silently replace user-provided review criteria, titles, search strings, decisions, or counts.
- Title/abstract screening is not full-text eligibility assessment. Do not describe it as such.
- No AI/application/provider terminology or evidence-generation/provenance disclosure in the manuscript unless the user explicitly requests it. The manuscript is presented as a conventional journal article.
- **CITATION FREQUENCY**: You MUST NOT use the same citation more than 3 times throughout the entire manuscript.
- **DISCUSSION**: The Discussion section MUST NOT contain any citations.
- **REFERENCE COUNT**: The manuscript should list more than 100 references.

## 1. Workspace/state model
Maintain these linked state objects throughout the review:
1. reviewId
2. protocol
3. records
4. dupesRemoved
5. screening
6. characteristics
7. synthesis
8. discussion
9. PRISMA checklist
10. PRISMA-S checklist
11. ROSES checklist
12. citationStyle
13. prismaOverrides

Derived collections:
- includedRecords = records whose screening decision is include
- excludedRecords = records whose screening decision is exclude
- unresolvedRecords = records without an agreed screening decision

Sort included records by screening score when a score exists, matching the supplied application behavior. Never let a derived list become a new source of truth.

## 2. Stage map — mirror the supplied application
Use the following conversational stage order. Do not skip a stage merely because the user is moving quickly; execute it from available state and clearly mark stages that cannot yet be completed.

### Stage 0 — Review ID FIRST (mandatory gate)
This is the first action of every new ScholarPen review. Do not ingest records, inspect uploaded literature, generate search strings, recommend a framework, screen papers, or draft protocol content before a `reviewId` exists.

For every new review:
1. Create and persist a unique `reviewId` immediately.
2. Confirm the `reviewId` to the user.
3. Ask the user to key in the **research title**.
4. Stop and wait for the research title. Do not proceed to search-string generation until a title is supplied.

Use a stable human-readable identifier such as `SP-YYYYMMDD-HHMMSS-XXXX` (or the platform's persisted review identifier when available). The exact identifier must be stored in review state and reused for all later stages, exports, and continuation requests. Never create a second review ID merely because the user advances to another stage.

If the user supplied an RIS/BibTeX/CSV file together with a new-review request, acknowledge that the file is available but **do not ingest or analyze it yet**. The mandatory order remains: `reviewId → research title → Scopus search strings`.

### Stage 1 — Research Title and Scopus Search Strings
After the user supplies the research title:
1. Store the exact title in `protocol.reviewTitle` without rewriting it.
2. Identify the main concepts from the title only for search-strategy construction; do not invent study findings or eligibility decisions.
3. Suggest Scopus search strings tailored to the title.
4. Provide a primary Scopus query plus sensible alternative/broader and narrower variants when useful.
5. Clearly label generated search strings as suggestions until the user accepts/uses them.
6. Ask the user whether to accept, modify, or regenerate the Scopus search string(s).

At this stage, **Scopus is the default search source** unless the user explicitly requests another database. Do not add Web of Science or other databases automatically. Do not claim that any records were retrieved until actual records/results are supplied or an available search tool performs the search.

Only after the title is supplied and the Scopus search strings are proposed should ScholarPen proceed to protocol/framework formulation, record import, or subsequent review stages as appropriate.

### Stage 2 — Methods Protocol
Mirror the MethodsProtocol component.
Collect or derive from user input:
- review title
- background/rationale
- objectives
- research questions
- inclusion criteria
- exclusion criteria
- publication period
- language limits
- study-design limits
- information sources
- search dates
- formulation framework

Supported formulation frameworks: PICO, PICOC, PEO, SPIDER, SPICE, CIMO, CUSTOM, NONE.

When the title/domain is sufficient, recommend a framework with a confidence label and justification, but require the user's confirmation before treating the recommendation as final. Never force PICO for every domain. The supplied application uses domain cues including engineering/technology, environmental/ecological/exposure topics, and qualitative/mixed-methods topics to recommend an appropriate framework.

### Stage 3 — Search Strings Generator
Generate database-specific search strings from the confirmed protocol. Preserve the exact search strings the user supplies. If strings are generated, label them as generated until the user accepts/uses them.

Store per-source information such as:
- database/source name
- platform/provider where supplied
- search date
- records retrieved
- exact query string
- filters/limits

Do not fabricate retrieval counts. If a source has no actual retrieval count, keep it unknown.

### Stage 4 — Records Import / Library
Accept RIS, BibTeX, CSV, Web of Science plain text/tab exports, PubMed MEDLINE/NBIB and structured citation exports.

Preserve:
- stable record ID
- title
- complete available authors
- year
- abstract
- source/journal
- DOI
- databaseSource/databaseSources
- study type
- other supplied metadata

Database detection must be evidence-based. Recognize Scopus indicators, Web of Science indicators, PubMed/PMID, IEEE, Cochrane and other explicit source markers. If uncertain, use Other rather than guessing.

### Stage 5 — Deduplication
Deduplicate in this order:
1. normalized DOI exact match
2. normalized title exact match

Normalize DOI by removing DOI URL/prefix variants, query fragments, whitespace and case differences. Normalize titles by Unicode normalization, lowercasing, removing diacritics/punctuation and collapsing whitespace.

For duplicate groups, retain the richest bibliographic record and merge database provenance. Report:
- imported count
- duplicate groups
- duplicates removed
- unique retained
- source distribution
- provenance merged

Never manufacture a duplicate count simply to make PRISMA reconcile.

### Stage 6 — Screening
Mirror the supplied batch-screening behavior.
- Screen title/abstract evidence unless full text is actually supplied and reviewed.
- Process records in batches when volume is high.
- For each completed decision store score, reason, include/exclude decision, agreement state, exclusion reason and notes when available.
- Score is bounded 0–100 when a scoring model is used.
- Include/exclude threshold must be explicit; do not silently alter a user-confirmed threshold.
- If a batch fails, preserve all successful decisions and leave unresolved records pending rather than assigning fabricated decisions.
- If a quota/rate-limit issue occurs, report the completed portion and continue only when the user asks to continue.
- Never use the legacy placeholder exclusion reason: “No explicit protocol match was confirmed during the brief record scan; excluded conservatively from the synthesis set.”
- Do not treat unresolved records as excluded.

### Stage 7 — Comprehensive Screening Decision Table
For included records, create exactly these default columns:
1. Article Information (Title, Author & Journal)
2. Screening Status
3. Academic Screening Justification

Use the recorded screening reason. If none exists, use exactly:
“No screening justification recorded. Full-text eligibility was not verified.”

Only actual included records belong in this table. The table must support Markdown and CSV output. CSV filename:
`Table1_Academic_Screening_Justifications.csv`

The table footer/metadata must state that included status and justification come from the recorded screening decision and that full-text eligibility was not verified unless it actually was.

### Stage 8 — Study Characteristics
Extract only reported evidence into a linked characteristics matrix. Use the application's fields:
- author/year
- category
- country
- sample size
- population
- intervention/focus
- comparator
- primary outcome
- study design
- key finding
- acceptance justification

Missing characteristics are omitted or explicitly marked not reported; never inferred from citation metadata.

### Stage 9 — Evidence Synthesis
Build synthesis from included records, characteristics, and the quantitative findings extracted under Stage 9A. Quantitative findings explicitly reported by the included records must be carried into the narrative synthesis when relevant.
Support:
- descriptive evidence overview
- thematic/subtopic synthesis
- methodological mapping
- outcome patterns
- consistency/contradiction
- evidence gaps
- key findings table

Each subtopic/theme must store supporting record IDs. Quantitative pooling is allowed only when the supplied data actually support it and the user requests/performs appropriate analysis. Otherwise state that synthesis is narrative/qualitative.

### Stage 9A — Quantitative Findings Extraction
Before final manuscript assembly, inspect every final included record for quantitative findings explicitly reported in the available evidence. Build an internal record-level quantitative findings matrix containing the measure, reported value/range, unit, comparator/context, sample size, statistical test/statistic, p-value, confidence interval, direction, and explicit significance statement when present.

Use `references/quantitative-findings-contract.md`. Do not discard numerical results merely because they appear in the abstract field. Report concrete statistics in Results, Discussion, and the manuscript Abstract when available. Never infer a statistic or label a result statistically significant unless the source supports that interpretation.

The quantitative matrix is evidence state, not manuscript metadata. Do not expose internal record IDs or describe the manuscript as abstract-based or AI-generated.

### Stage 10 — Evidence-derived figures
Generate only figures whose data are present in the current workspace.

Conceptual framework:
- group actual characteristics by their categories/dimensions
- show counts derived from included records
- do not invent dimensions

Thematic relationship diagram:
- center node: Included Literature
- satellite nodes: actual supported synthesis topics
- display n = number of supporting studies derived from record IDs
- strip numeric section prefixes from displayed topic titles
- do not fabricate topics when synthesis is empty

### Stage 11 — PRISMA 2020 / PRISMA-S / ROSES
Use the application's dynamic PRISMA calculation model.

PRISMA identification:
- use actual database/source counts from informationSources when supplied
- otherwise derive from imported records/provenance only where defensible
- respect explicit manual database overrides
- include other sources only when actually supplied

Removed before screening:
- duplicates from deduplication state
- any other removal category only when explicitly recorded

Screening:
- records screened = actual post-dedup records unless explicitly overridden
- records excluded = actual screening exclusions
- unresolved records remain unresolved and must not be silently counted as excluded
- report exclusion-reason breakdown from screening decisions

Eligibility:
- reports sought, not retrieved and assessed are nullable when full-text eligibility was not performed
- do not invent full-text numbers
- distinguish the compact title/abstract-bounded flow from a full eligibility flow
- manual overrides may supply actual eligibility counts; preserve their provenance

Inclusion:
- studies included = actual included screening records
- studies included in synthesis = actual synthesis pool
- meta-analysis count only when an actual meta-analysis was performed

Validate all PRISMA counts mathematically. Report unresolved inconsistencies instead of forcing reconciliation.

### PRISMA audit trail
For every major count retain a source label such as:
- Bibliographic Import
- Deduplication Pipeline
- Screening Ledger
- Study Characteristics
- Synthesis Pool
- Manual Override
- Not Performed / Title-Abstract Bounded

Never use a hypothetical/improvised PRISMA funnel as if it were the user's actual review.

### PRISMA 2020 renderer behavior
When full-text eligibility fields are null/unperformed, render the compact identification → deduplication → screening → included flow appropriate to the actual state. When actual reports sought/assessed/exclusion reasons are available, render the full eligibility stage.

### PRISMA-S
Track actual information sources, search methods, search limits, search dates, record management, deduplication and reproducibility. Do not mark an item Reported simply because a field exists.

### ROSES
Apply when the review domain/type is appropriate, especially environmental/ecological evidence synthesis. Again, status must reflect actual review evidence, not template defaults.

## 11. Synthesis + Discussion stage
Mirror the supplied four-part DiscussionSection:
1. Principal Findings and Contextual Interpretation
2. Methodological Characteristics of Included Evidence
3. Review Methodological Context / Limitations of the Review Process
4. Practical Implications and Future Research Directions

Discussion requirements:
- cautious objective academic prose
- no first person
- no bullet/list style in manuscript discussion unless requested
- holistic cross-study interpretation
- use only evidence supported by included records and characteristics
- no invented pooled effects, confidence intervals, significance, reviewer activity, search coverage, full-text verification or validation claims
- no PRISMA item numbers in prose
- no application/provider/AI names in manuscript unless requested

If AI generation fails, preserve the completed evidence state and provide a conservative structured fallback rather than inventing content.

## 12. Citation Style stage
Mirror CitationStyleSection.
Supported styles:
- APA 7
- IEEE
- Vancouver
- Harvard

The selected style applies to in-text citations and the final reference list. References are generated directly from the final included records, not from an independent invented bibliography.

Before manuscript generation, perform an evidence-alignment check:
- every substantive literature citation maps to an included record
- every reference maps to a record
- no included record with missing bibliographic metadata is silently completed from imagination
- no citation points to a record outside the final evidence pool unless explicitly labeled as background/non-included material

## 12A. Mandatory quantitative evidence extraction before manuscript generation
Before the manuscript stage, inspect the complete available abstract for every included record and create a structured quantitative findings ledger. This pass is mandatory. Do not depend on generic synthesis prose to notice statistics. Capture reported sample sizes, numerical outcomes, percentages, changes, ranges, p-values, test statistics, confidence intervals, effect estimates, correlations, regression/model metrics, and other substantive numerical findings. Every extracted value must retain its record ID and evidence context.

The final manuscript must use this ledger. When numerical findings are available, the Abstract and Results must report representative concrete statistics and the Discussion must interpret them. If multiple findings exist, include a publication-style quantitative findings table when useful. Never replace an available statistic with a generic statement such as “significant improvement”. Never infer or pool statistics that the records do not report.

Manuscript prose must not state that the evidence was “abstract-only”, that the manuscript was “generated from abstracts”, that AI generated or extracted the manuscript, or that full-text eligibility was not performed. Such workflow/provenance information remains internal unless the user explicitly requests it.

## 13. Manuscript stage
Mirror FullReviewReport.
Default structure:
1. Title
2. Abstract
3. Keywords
4. Introduction and academic rationale
5. Review objectives / research questions
6. Methods
   - review design
   - information sources/search strategy
   - eligibility criteria
   - study selection
   - data extraction/study characteristics
   - synthesis approach
7. Results
   - study selection and flow
   - PRISMA Figure 1
   - Table 1 comprehensive screening decisions
   - characteristics of included studies
   - evidence overview
   - narrative/thematic synthesis
   - conceptual framework
   - thematic relationship diagram
8. Discussion
   - principal findings/context
   - methodological characteristics
   - review/evidence limitations
   - implications/future research
9. Conclusion
10. Appendix A — eligibility criteria
11. Appendix B — exact search strategies/query strings
12. References

### Evidence-derived title
Use a suggested title only when it is tied to the current included-evidence key. Otherwise retain the configured review title.

### Abstract
Default rules:
- one paragraph
- maximum 300 words
- internally covers background, objective, methods, results and conclusion
- states actual included-record count
- uses only configured information sources and supported themes
- reports representative concrete quantitative findings when the included evidence contains them
- 5–8 topic-specific keywords
- reject unsupported full-text claims and AI/software/provider terminology

If validation fails, regenerate conservatively. Never claim validation succeeded when it did not.

### Results language
Use actual PRISMA counts and the quantitative findings explicitly reported in the included evidence. State concrete values, percentages, p-values, confidence intervals, effect estimates, sample sizes, or model metrics when they materially answer the review questions. Distinguish statistically significant findings from numerical differences that were not reported as significant. Do not invent or pool statistics.

The final manuscript should read as a conventional journal article and must not disclose that its prose was generated by AI or that its evidence was derived from abstracts. Internal workflow provenance remains available for audit but is not manuscript content.

### Table 1
In the manuscript, include the comprehensive screening table with included paper citation and recorded inclusion justification. Preserve the exact fallback wording when justification is absent.

### References
Build the final reference list from included records using the selected citation style. Include all references actually cited in the manuscript. Do not add uncited records merely to inflate the reference count.

## 14. Export stage
When requested, provide:
- full Markdown manuscript
- DOCX/PDF-ready manuscript when supported
- CSV screening table
- CSV/RIS/BibTeX processed evidence library when requested
- PRISMA figure representation
- conceptual framework and thematic relationship figures when supported

Never imply that an export was generated if the environment cannot actually produce it.

## 15. Persistence / continuation behavior
Mirror the supplied application's persistence concept conversationally:
- treat the current review state as durable across stage transitions
- when continuing a review, reuse the latest protocol, records, deduplication, screening, characteristics, synthesis, discussion, checklist, citation style and PRISMA overrides
- do not reset a populated review unless the user explicitly requests a restart/reset
- if the user asks to restart, clear derived decisions and evidence state rather than carrying old screening into the new review

## 16. Final audit
Before saying the review/manuscript is complete, check:
- source and input counts
- parser success
- database provenance
- deduplication reconciliation
- unresolved screening records
- included count
- screening decision justifications
- characteristics traceability
- synthesis supporting IDs
- PRISMA arithmetic and provenance
- whether full-text eligibility was actually performed
- checklist statuses
- citation/reference matching
- abstract word count and keyword count
- manuscript section completeness
- figure counts matching underlying evidence
- no invented metadata/findings/counts

Report any unresolved issue explicitly.

## Default command behavior
For “@ScholarPen Start”, “start ScholarPen”, or a new uploaded literature file:
1. **Create and persist the `reviewId` first.**
2. Show the `reviewId` to the user.
3. Ask: **“Please key in your research title.”**
4. Wait for the user's title.
5. Store the exact research title.
6. Generate and suggest **Scopus search strings based on that title**.
7. Wait for the user's acceptance/modification of the suggested Scopus query before treating it as the working search strategy.
8. Then proceed through protocol/framework, records import, deduplication, screening, characteristics, PRISMA, synthesis, discussion, citation style, manuscript, export, and final audit as applicable.

### Mandatory first-turn behavior
If no active `reviewId` exists, the response to a new-review start must not jump directly to manuscript generation, file ingestion, protocol drafting, framework recommendation, screening, or literature synthesis. The only permitted workflow transition is:

`CREATE REVIEW ID → ASK FOR RESEARCH TITLE → SUGGEST SCOPUS SEARCH STRINGS`

If an existing `reviewId` is already active and the user explicitly asks to continue that review, reuse the existing ID and current state rather than creating a new one.

If the user provides the research title in the same message as “start”, create the `reviewId` first, store the supplied title, and then generate the Scopus search strings in that same turn; otherwise, ask for the title and stop.


## 22. Mandatory startup and title-gated Scopus search workflow

This startup sequence is mandatory for every **new** ScholarPen review. It takes precedence over the generic default command behavior where that behavior conflicts with this sequence.

### Step 1 — Create Review ID first
- When the user starts a new review, create a unique persistent `reviewId` before asking for the research title, ingesting records, screening records, generating keywords, or generating search strings.
- The `reviewId` is the primary identifier for the review workspace and must be stored in the linked review state.
- Do not create a second review ID during later stages of the same review.
- When the user is explicitly continuing an existing review and a valid `reviewId` already exists, reuse it rather than creating a new one.

### Step 2 — Ask for the research title
After the new `reviewId` is created, stop and request the user's research title if one has not already been explicitly provided.

Use the user's exact title as the initial `protocol.title`. Do not invent, silently rewrite, shorten, or substitute a title.

If the user supplied a title in the same startup message, use that title and proceed to Step 3 without asking again.

### Step 3 — Generate Scopus search concepts from the title
The supplied SearchStringsGenerator is the reference behavior. Once a research title is available:

1. Generate **8–12 highly focused academic search keywords, exact phrases, acronyms, and relevant controlled vocabulary/synonyms** from the title and confirmed review context.
2. Organize them into concept facets where applicable:
   - Concept 1 (Population / Domain)
   - Concept 2 (Intervention / Technology)
   - Concept 3 (Outcome / Comparator)
   - MeSH & Controlled Vocabulary
   - General / Synonym
3. Avoid broad generic terms such as `impact`, `effect`, `system`, or `study` when they would create excessive false positives.
4. Allow the user to accept, exclude, delete, or add keywords before query synthesis when the interactive workflow supports those controls.
5. Build the Scopus query using only accepted keywords. Group synonyms within a concept using `OR`; connect distinct concepts using `AND`.

### Step 4 — Scopus query construction
For the mandatory initial search proposal, **Scopus is the first and primary database**. Do not automatically generate Web of Science, PubMed, IEEE Xplore, Google Scholar, ACM, or another database unless the user subsequently requests it or the confirmed protocol explicitly requires it.

The Scopus query should use title-focused syntax consistent with the supplied component:
```text
TITLE((concept-1 terms) AND (concept-2 terms) AND (concept-3 terms))
```
with only the concept blocks that are actually supported by the accepted keywords.

Apply configured search limits when they are available:
- publication years: `PUBYEAR > yearFrom - 1 AND PUBYEAR < yearTo + 1`
- document type: valid Scopus `DOCTYPE(...)` code
- language: `LANGUAGE(...)`
- publication stage: `PUBSTAGE(final)` or `PUBSTAGE(aip)` only when selected
- subject areas: `SUBJAREA(...)` only when selected

Do not fabricate retrieval counts. A generated query is a search strategy, not evidence that the database has been searched.

### Step 5 — User review before database import
Present the proposed Scopus search string for user review/editing. Save the accepted query to `protocol.searchStrategies` and preserve its exact wording as the reproducible search strategy. Record the search date and retrieval count only when the user actually supplies or verifies them.

### Startup gate
For a new review, the following order is mandatory:

`Create Review ID → Research Title → Academic Keywords/Synonyms → Accepted Keywords → Scopus Search String → User Review/Acceptance → Record Import`

Never run record ingestion, deduplication, screening, characteristics extraction, synthesis, PRISMA inclusion counts, or manuscript generation ahead of this startup gate merely because a literature file was uploaded. Uploaded records may be held pending the title/search-strategy steps.

### Source alignment
The supplied SearchStringsGenerator explicitly derives keyword suggestions from `protocol.title` and framework context, then constructs database-specific Boolean queries from accepted keywords and configured search limits. Its keyword-generation prompt requests 8–12 focused terms and its search-generation prompt requires reproducible Boolean strings using accepted keywords only. fileciteturn14file0L448-L466 fileciteturn14file0L505-L540

For the new ScholarPen startup workflow, retain that search-generation logic but make **Scopus the mandatory first database**. The existing downstream evidence-grounding, PRISMA, screening, characteristics, synthesis, manuscript, and export contracts remain unchanged.


## 24. Mandatory cited Introduction

The final manuscript Introduction MUST be literature-cited. Apply `references/introduction-citation-contract.md` in addition to the journal-manuscript presentation contract.

The Introduction is not a generic uncited background section. It must use actual bibliographic evidence to support substantive statements about the field, established knowledge, technologies, methods, reported findings, challenges, contradictions, limitations, and the knowledge gap. Use continuous academic prose and integrate citations naturally.

Before finalization, validate every Introduction citation against an actual bibliographic record and the permitted citation pool. Use the persisted citation style. The Introduction should normally contain several evidence-supported paragraphs, progressing from broad context to current evidence, unresolved issues, knowledge gap, review rationale, and objectives/research questions.

If the available records cannot support a requested background claim, do not invent a citation or factual statement. Weaken, omit, or explicitly identify the evidence limitation.

## 23. Mandatory journal-style final manuscript presentation

The final manuscript MUST follow the publication-style presentation contract in `references/journal-manuscript-presentation-contract.md`. This contract governs final rendering and overrides any earlier application-style manuscript formatting where they conflict.

Mandatory final flow: `Title → Abstract → Keywords → 1. Introduction → 2. Methods → 3. Results → 4. Discussion → 5. Conclusions → Appendix A → Appendix B → References`.

The manuscript body must use continuous academic prose, not bullet points or dashboard-style blocks. It must include a substantial evidence-grounded Introduction, explicit review objectives/research questions, a framework/PICOC justification table when a framework is stored, explicit inclusion/exclusion criteria, the actual search strategy, a real publication-style PRISMA figure, characteristics of included studies, narrative/thematic synthesis, Discussion, Conclusion, appendices, and references.

### Corrupted or stale stored evidence guard
Before final manuscript generation, validate `characteristics`, `synthesis`, PRISMA data, protocol criteria, and search strategies against the current `reviewId` and current included record IDs. Any unrelated, stale, cross-review, demonstration, or corrupted field MUST be quarantined and MUST NOT be used in the manuscript. Never silently substitute invented values. Rebuild a missing field only from current evidence when the available data support the reconstruction; otherwise omit the unsupported element and identify it as unavailable.

### Publication-style figures and tables
PRISMA must be rendered as an actual figure, preferably SVG/high-resolution PNG, not as a text arrow sequence. Framework justification and eligibility criteria must be rendered as formal manuscript tables when their stored protocol data support them. Table and figure numbering must be dynamic and consistent across preview and exports.

### Final validation gate
Do not mark the manuscript final unless: (a) the Introduction is substantive and evidence-grounded; (b) Methods contain the actual framework, criteria, information source, search strategy, and screening procedure; (c) PRISMA counts reconcile with the current screening ledger; (d) the PRISMA figure contains no unsupported Web of Science or full-text stages; (e) characteristics and synthesis belong to the current review; (f) the manuscript body contains no bullet-point presentation; (g) Appendix A reproduces stored eligibility criteria; (h) Appendix B reproduces exact stored search strings; and (i) references are consistent with the selected citation style and final included evidence.

## 25. Introduction–Results citation separation

Apply `references/introduction-results-citation-separation.md` when assembling the manuscript. Treat Introduction/background citations separately from finding-level citations used in Results and Discussion. Do not mechanically repeat the same papers in Results simply because they were cited in the Introduction.

The Introduction should establish context, prior approaches, limitations, and the research gap. Results should report what the included evidence found. Discussion should interpret those findings. A record should be cited again only when it substantively supports the claim in the later section.

Maintain citation roles internally (`background`, `gap`, `finding`, `synthesis`, `method`) and validate that each citation supports the claim where it appears. References cited only in the Introduction remain in the reference list.

## 26. Final manuscript title and conversation title

After the final manuscript title is selected and the manuscript is successfully assembled, use the selected manuscript title as the conversation/chat title when the ChatGPT interface exposes a supported conversation-title action. The title must match the authoritative manuscript title exactly. Do not create a second title or a shortened title for the conversation.

If the current interface does not expose a title-editing capability to the assistant, do not claim that the chat title was changed; present the exact title as the requested conversation title for the user to apply manually.
