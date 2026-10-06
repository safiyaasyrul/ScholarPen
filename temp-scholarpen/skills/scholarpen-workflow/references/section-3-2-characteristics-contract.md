## 20. Section 3.2 — Characteristics of Included Studies: record-level aggregation
Section 3.2 must always use **one included study / one record as the unit of analysis**. This section is descriptive reporting, not a classification exercise.

### Authoritative evidence set
- Use the current `includedRecords` collection as the only evidence set for Section 3.2.
- `includedRecords` means records with a final agreed `include` screening decision.
- Do not use all imported records, excluded records, unresolved records, discarded records, prior inclusion snapshots, synthesis subsets, `introductionRecords`, `detailedRecords`, AI-processing budgets, or manuscript text.
- If `includedRecords` changes, the Section 3.2 table and narrative must change accordingly.

### Characteristics to display
Display exactly these five characteristics unless the user explicitly requests another structure:
1. Study/intervention category
2. Context
3. Methodological approach
4. Reported outcome type
5. Geographical context

Do **not** include publication-year distribution in Section 3.2.

### Source of characteristic values
Use the existing stored `StudyCharacteristic` data for the matching `recordId` whenever a field is available. Do not replace missing values with inferred classifications.

Recommended field mapping:
- Study/intervention category → `StudyCharacteristic.category` (or an explicitly stored equivalent for the same record)
- Context → the explicitly stored context field, if the application has one; otherwise `Not reported`
- Methodological approach → `StudyCharacteristic.studyDesign` (or an explicitly stored methodological-approach field)
- Reported outcome type → `StudyCharacteristic.primaryOutcome` (or an explicitly stored outcome-type field)
- Geographical context → `StudyCharacteristic.country`

If the application has not actually extracted a value for a characteristic, display exactly `Not reported`.

Never display `Not established from citation metadata` in Section 3.2. Citation metadata does not establish study characteristics.

### Mandatory aggregation rule
For each characteristic, aggregate by **value per included record**. The implementation must behave conceptually like:

```ts
const counts = new Map<string, number>();

for (const record of includedRecords) {
  const characteristic = characteristicsByRecordId.get(record.id);
  const value = (characteristic?.field ?? '').trim() || 'Not reported';
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
```

The important invariant is that the loop iterates over `includedRecords`, never over characters, object keys, serialized JSON, tokens, or array elements inside a field.

For every single-valued characteristic:
- each included record contributes at most one category;
- each record is counted once;
- every displayed count must be `<= includedRecords.length`;
- the sum of category counts must equal `includedRecords.length`.

If a field genuinely supports multiple explicitly stored values for one study, do not count tokens or string fragments. Count the study once per explicitly stored category only when the data model explicitly permits multi-valued membership, and label/handle that multi-category characteristic accordingly so the total is not falsely expected to equal the number of studies.

### Forbidden legacy classification logic
Section 3.2 must NOT call, reuse, or reproduce any keyword/title classifier, including:
- `outcomeTerms`
- `technologyTerms`
- `methodsTerms`
- `classifyRecordTheme`
- `buildClusters`
- `themeDefinitions`
- title substring matching
- keyword matching
- hard-coded maritime categories
- character counts
- object-property counts
- array-length counts used as study counts
- concatenated/serialized values followed by string-length or token counting

Do not infer a category from the record title, abstract, DOI, journal, year, or other citation metadata when an extracted characteristic is absent.

### Required manuscript table
Render Section 3.2 as a compact table:

| Characteristic | Category | n |
|---|---|---:|
| Study/intervention category | ... | ... |
| Context | ... | ... |
| Methodological approach | ... | ... |
| Reported outcome type | ... | ... |
| Geographical context | ... | ... |

The actual categories and counts must be generated from the current included records and stored characteristics. Do not hard-code example categories or numbers.

### Narrative
After the table, generate one short descriptive paragraph based only on the resulting table. Describe the overall distribution of the five characteristics without turning the section into one sentence per study.

Do not:
- provide a long explanation of the aggregation logic in the manuscript;
- mention AI, software implementation, or API processing;
- repeatedly discuss metadata limitations;
- turn each included study into a separate narrative sentence;
- use publication year as a characteristic in this section.

### Section 3.2 validation
Before rendering or exporting Section 3.2, validate:
1. `includedRecords` is the authoritative input.
2. Every category count is an integer and `0 <= count <= includedRecords.length`.
3. For each single-valued characteristic, the category-count sum equals `includedRecords.length`.
4. No count can exceed the number of included records.
5. No `Not established from citation metadata` value is rendered.
6. No publication-year distribution is rendered.
7. No legacy keyword/title classifier is used.
8. Missing extracted values become `Not reported` rather than inferred categories.
9. Changing the included-record set changes the resulting table.

For example, with 11 final included records, a single-valued characteristic can never display a count of 161. A result such as `Energy, emissions and environmental performance — 161` is invalid regardless of the text length or serialized representation of the source data.
