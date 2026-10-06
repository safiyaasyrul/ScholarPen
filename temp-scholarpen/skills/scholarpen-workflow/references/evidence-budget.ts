import { SLRRecord, StudyCharacteristic, SLRProtocol } from "../types/slr";

export const MAX_INTRODUCTION_RECORDS = 100;
export const MAX_DETAILED_RECORDS = 100;

const STOP_WORDS = new Set([
  "about","after","again","against","among","and","are","based","been","being","between","both","can","could","data","different","during","each","for","from","have","into","more","most","other","over","such","than","that","their","these","they","this","those","through","using","were","which","with","within","without","study","studies","analysis","review","systematic","literature",
]);

const clean = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

const tokenize = (text: string): string[] =>
  clean(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^-+|-+$/g, ""))
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word) && !/^\d+$/.test(word));

const unique = <T,>(items: T[]): T[] => Array.from(new Set(items));

const getProtocolTerms = (protocol?: SLRProtocol): Set<string> => {
  if (!protocol) return new Set();
  const source = [
    clean((protocol as any).title), clean((protocol as any).researchQuestion),
    clean((protocol as any).question), clean((protocol as any).objective),
    clean((protocol as any).objectives), clean((protocol as any).scope),
    clean((protocol as any).population), clean((protocol as any).intervention),
    clean((protocol as any).outcome), clean((protocol as any).context),
  ].filter(Boolean).join(" ");
  return new Set(tokenize(source));
};

const overlapScore = (termsA: Set<string>, termsB: Set<string>): number => {
  if (termsA.size === 0 || termsB.size === 0) return 0;
  let matches = 0;
  termsA.forEach((term) => { if (termsB.has(term)) matches += 1; });
  return matches / Math.max(termsA.size, 1);
};

/** Select up to 100 records for the introduction using title relevance only. */
export const selectIntroductionRecords = (
  records: SLRRecord[], protocol?: SLRProtocol
): SLRRecord[] => {
  if (records.length <= MAX_INTRODUCTION_RECORDS) return [...records];
  const protocolTerms = getProtocolTerms(protocol);
  const documentFrequency = new Map<string, number>();

  records.forEach((record) => {
    unique(tokenize(clean(record.title))).forEach((term) => {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    });
  });

  return records.map((record, originalIndex) => {
    const titleTerms = unique(tokenize(clean(record.title)));
    const titleSet = new Set(titleTerms);
    const protocolRelevance = overlapScore(titleSet, protocolTerms);
    const centrality = titleTerms.reduce((sum, term) => sum + 1 / Math.max(documentFrequency.get(term) || 1, 1), 0);
    const titleInformation = Math.min(titleTerms.length, 15) / 15;
    const abstractAvailability = clean(record.abstract).length > 0 ? 0.05 : 0;
    const score = protocolRelevance * 100 + centrality * 5 + titleInformation * 5 + abstractAvailability;
    return { record, score, originalIndex };
  }).sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex)
    .slice(0, MAX_INTRODUCTION_RECORDS).map((item) => item.record);
};

/** Select up to 100 detailed evidence records from ALL included records. */
export const selectDetailedEvidenceRecords = (
  records: SLRRecord[], characteristics: StudyCharacteristic[], protocol?: SLRProtocol,
  maxLimit: number = MAX_DETAILED_RECORDS
): SLRRecord[] => {
  const boundedLimit = Math.max(1, Math.min(MAX_DETAILED_RECORDS, maxLimit));
  if (records.length <= boundedLimit) return [...records];
  const protocolTerms = getProtocolTerms(protocol);
  const characteristicMap = new Map<string, StudyCharacteristic>();
  characteristics.forEach((characteristic) => {
    if (characteristic.recordId) characteristicMap.set(characteristic.recordId, characteristic);
  });

  return records.map((record, originalIndex) => {
    const characteristic = characteristicMap.get(record.id);
    const intervention = clean((characteristic as any)?.interventionOrFocus);
    const studyDesign = clean((characteristic as any)?.studyDesign);
    const population = clean((characteristic as any)?.population);
    const outcome = clean((characteristic as any)?.primaryOutcome);
    const keyFinding = clean((characteristic as any)?.keyFinding);
    const comparator = clean((characteristic as any)?.comparator);
    const category = clean((characteristic as any)?.category);
    const abstract = clean(record.abstract);
    const title = clean(record.title);
    const evidenceText = [title, abstract, intervention, studyDesign, population, outcome, keyFinding, comparator, category].filter(Boolean).join(" ");
    const evidenceTerms = new Set(tokenize(evidenceText));
    const interventionTerms = new Set(tokenize(intervention));
    const contentTerms = new Set(tokenize(`${abstract} ${keyFinding} ${outcome}`));
    const protocolRelevance = overlapScore(evidenceTerms, protocolTerms);
    const interventionRelevance = overlapScore(interventionTerms, protocolTerms);
    const contentRelevance = overlapScore(contentTerms, protocolTerms);
    const hasMethod = studyDesign.length > 0 && studyDesign.toLowerCase() !== "not reported in the supplied record";
    const hasIntervention = intervention.length > 0 && intervention.toLowerCase() !== "not reported in the supplied record";
    const hasAbstract = abstract.length >= 100;
    const hasFinding = keyFinding.length >= 30;
    const hasOutcome = outcome.length > 0;
    const evidenceCompleteness = [hasMethod, hasIntervention, hasAbstract, hasFinding, hasOutcome].filter(Boolean).length / 5;
    const score = protocolRelevance * 60 + interventionRelevance * 25 + contentRelevance * 20 + evidenceCompleteness * 15 + (hasMethod ? 5 : 0) + (hasIntervention ? 5 : 0) + (hasAbstract ? 3 : 0);
    return { record, score, originalIndex };
  }).sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex)
    .slice(0, boundedLimit).map((item) => item.record);
};

/**
 * Build the evidence budget used by synthesis/manuscript generation.
 * Introduction and detailed pools are independent selections from all included records.
 */
export const buildEvidenceBudget = (
  records: SLRRecord[], characteristics: StudyCharacteristic[], protocol?: SLRProtocol,
  options: { maxIntroduction?: number; maxDetailed?: number } = {}
) => {
  const maxIntro = Math.max(1, Math.min(MAX_INTRODUCTION_RECORDS, options.maxIntroduction ?? MAX_INTRODUCTION_RECORDS));
  const maxDet = Math.max(1, Math.min(MAX_DETAILED_RECORDS, options.maxDetailed ?? MAX_DETAILED_RECORDS));
  return {
    allRecords: [...records],
    introductionRecords: selectIntroductionRecords(records, protocol).slice(0, maxIntro),
    detailedRecords: selectDetailedEvidenceRecords(records, characteristics, protocol, maxDet),
  };
};
