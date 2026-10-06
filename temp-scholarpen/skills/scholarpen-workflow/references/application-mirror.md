# ScholarPen Application Mirror — Source-Derived Implementation Notes

This reference records the supplied application's observable architecture and behavior so the conversational plugin stays aligned with the source application.

## Application state
The supplied App component maintains protocol, records, duplicates removed, screening, characteristics, synthesis, discussion, PRISMA checklist, PRISMA-S checklist, ROSES checklist, citation style and PRISMA overrides. It derives included records from screening decisions and excluded records separately.

## Persistence
The supplied application hydrates a durable PostgreSQL workspace snapshot through `/api/prisma/workspace` while retaining localStorage as an offline/migration cache. The conversational mirror treats these objects as one durable review state and does not reset populated state during stage transitions.

## Navigation
The supplied application exposes stages through navigation and StepGuidance. The visible final stages include:
- Step 12: Synthesis
- Step 13: Citation Style
- Step 14: Manuscript
- Step 15: Export

The preceding source components establish protocol, search, import/library, screening, characteristics, synthesis and PRISMA stages.

## MethodsProtocol
The application recommends formulation frameworks from the review title/domain. Framework options include PICO, PICOC, PEO, SPIDER, SPICE, CIMO and NONE, with custom support in the underlying type model. Recommendation confidence and justification are stored before confirmation.

## Screening
The application screens records in batches, sends title/abstract metadata, accepts structured decisions, clamps numeric scores to 0–100, stores include/exclude plus reasons, saves successful decisions even when later batches fail, and leaves unresolved records pending. Quota/rate-limit failures do not convert pending records into exclusions.

## PRISMA
The application calculates PRISMA dynamically from records, duplicates, screening, characteristics, synthesis, information sources and manual overrides. Database counts can come from information-source retrieval counts or explicit manual overrides. Full-text fields remain nullable when full-text eligibility was not performed; the application labels that state as “Not Performed / Title-Abstract Bounded.”

## Screening decision table
The supplied StudyCharacteristicsTable component is specifically a “Comprehensive Screening Decision Table.” Its default columns are Article Information (Title, Author & Journal), Screening Status, and Academic Screening Justification. It includes only included records and exports `Table1_Academic_Screening_Justifications.csv`. The exact fallback justification is: “No screening justification recorded. Full-text eligibility was not verified.”

## CitationStyleSection
The supplied component allows selection of APA 7, IEEE, Vancouver or Harvard before manuscript generation. Its evidence-alignment contract states that in-text citation placeholders and the final Reference list are bound to the exact final included evidence pool.

## FullReviewReport
The supplied report generator constructs title, methodology, abstract, keywords, introduction/rationale, objectives/questions, methods, results, PRISMA figure, Table 1, study characteristics, evidence overview, narrative/thematic synthesis, discussion, conclusion, appendices and references. It embeds PRISMA, conceptual-framework and thematic-relationship SVG figures and supports Markdown/HTML/DOCX-oriented exports.

## Evidence-derived figures
The supplied report uses PRISMA SVG rendering, a conceptual framework SVG based on grouped characteristics, and a thematic relationship SVG based on synthesis topics and supporting record IDs.

## Important source-level correction for the mirror
A PRISMA helper in the supplied code contains an `improvisePrismaFlowData` function that can create hypothetical funnel counts. The conversational ScholarPen mirror must NOT treat such improvised values as actual review data. Actual PRISMA values must come from the deterministic calculator state or explicit user-provided overrides.
