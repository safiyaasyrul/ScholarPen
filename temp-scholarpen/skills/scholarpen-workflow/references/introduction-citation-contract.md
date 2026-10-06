# Introduction Citation Contract — v2.7

The Introduction of the final manuscript is a literature-grounded scholarly section, not an uncited background generated from the review title.

## Mandatory citation requirement
- The Introduction MUST contain in-text literature citations wherever it makes substantive claims about the research field, established knowledge, technologies, methods, trends, reported findings, challenges, limitations, or prior approaches.
- A final manuscript with a completely uncited Introduction is invalid unless the review contains zero usable bibliographic records; in that case the manuscript must state the evidence limitation rather than invent background citations.
- Citations must resolve to real records available in the current review evidence or to explicitly permitted background records supplied by the user.
- Never fabricate authors, years, DOI, journal information, or citation relationships.
- Use the persisted citation style (APA 7, IEEE, Vancouver, or Harvard).

## Evidence selection for Introduction
- Prefer relevant records from the current review, especially included records, for field background, prior approaches, findings, and gaps.
- The Introduction MAY cite excluded/background records only when they are explicitly present as bibliographic records and the review state permits background citation; such citations must be clearly distinguished from final included evidence.
- Do not cite a record merely because its title contains a matching keyword. The citation must support the proposition from available metadata/abstract or supplied evidence.
- If abstracts are unavailable and a substantive claim cannot be supported, omit or weaken the claim rather than inventing support.

## Required Introduction progression
Write continuous journal prose, normally 4–8 paragraphs depending on evidence volume:
1. Broad research context and significance, with citations.
2. Current state of the field and major approaches/findings, with multiple citations where supported.
3. Specific technical/methodological development or problem addressed by the review, with citations.
4. Limitations, inconsistencies, or unresolved issues identified across the literature, with citations.
5. Knowledge gap and rationale for conducting the systematic review, grounded in the cited literature.
6. Review objective and research questions, followed by a concise statement of the review contribution.

Do not create a generic five-paragraph introduction detached from the records. The length and number of paragraphs must follow the evidence.

## Citation density and quality
- Avoid citation dumping at the end of every sentence. Integrate citations at the proposition level.
- Use multiple independent records when describing a field-level pattern, where the available evidence supports that pattern.
- Do not use one paper to make a broad field-level claim unless that is genuinely all the evidence supports.
- Do not invent a knowledge gap simply because the user requested one. Derive gaps from documented limitations, contradictions, under-studied contexts, or coverage patterns in the available evidence.

## Citation architecture
AI prose should identify supporting record IDs, not formatted citations. The central citation formatter applies the selected style after evidence relationships are validated.

For each Introduction paragraph or substantive claim group, maintain evidence links such as:
`supportingRecordIds: [record-id-1, record-id-7]`

Every ID must exist in the permitted citation pool.

## Validation
Before finalization check:
- Introduction contains substantive literature citations.
- Every Introduction citation resolves to a real bibliographic record.
- No citation points to an unresolved record as if it were included evidence.
- Citation style matches the manuscript reference list.
- References cited in the Introduction appear in the final reference list or in the explicitly supported background-reference section.
- No unsupported factual claim is introduced merely to make the Introduction longer.
- The Introduction is continuous academic prose, not bullets.
