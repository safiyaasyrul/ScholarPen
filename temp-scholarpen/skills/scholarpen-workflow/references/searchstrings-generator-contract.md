# SearchStringsGenerator Contract — Supplied Source

ScholarPen should mirror the supplied SearchStringsGenerator behavior for the initial search-strategy stage.

## Source-derived behavior
- Keyword suggestions require `protocol.title`.
- The component requests 8–12 focused academic keywords, exact phrases, acronyms, and controlled vocabulary/synonyms.
- Keywords are grouped into Concept 1 (Population / Domain), Concept 2 (Intervention / Technology), Concept 3 (Outcome / Comparator), MeSH & Controlled Vocabulary, and General / Synonym.
- Search strings use accepted keywords only.
- Synonyms within the same concept are joined with OR; distinct concepts are joined with AND.
- Scopus uses `TITLE(...)` plus applicable `PUBYEAR`, `DOCTYPE`, `LANGUAGE`, `PUBSTAGE`, and optional `SUBJAREA` filters.
- The supplied component also supports Web of Science, but ScholarPen's new startup contract makes Scopus the first required search proposal and does not generate other database queries unless requested.
- Retrieval counts are user/database facts and must never be fabricated.

## Startup sequence
`Review ID → Research Title → Keyword Suggestions → Accepted Keywords → Scopus Query → User Acceptance → Import Records`
