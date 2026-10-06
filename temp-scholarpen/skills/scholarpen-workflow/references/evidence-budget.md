# Evidence Budget Reference

The supplied application code defines two hard caps:
- `MAX_INTRODUCTION_RECORDS = 100`
- `MAX_DETAILED_RECORDS = 100`

The introduction selector scores title relevance against protocol terms, title-term centrality, title information content, and abstract availability.

The detailed selector operates on **all included records**, joins available `StudyCharacteristic` records by `recordId`, and scores protocol relevance, intervention relevance, content relevance, evidence completeness, explicit method/intervention information, and abstract availability.

`buildEvidenceBudget()` returns `allRecords`, `introductionRecords`, and `detailedRecords`. The detailed selection is deliberately independent of the introduction selection.

These caps are processing budgets for manuscript generation, not limits on PRISMA counts or the actual review evidence base.


## Narrative-first override
The introduction/detailed pools are processing budgets only. They must never be treated as a final evidence subset. Narrative and thematic synthesis must cover every final included record, using chunked or multi-pass processing when necessary.
