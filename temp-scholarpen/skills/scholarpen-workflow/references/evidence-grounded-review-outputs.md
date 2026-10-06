# Evidence-grounded review outputs

Review outputs distinguish imported citation metadata, recorded screening decisions, and verified full-text evidence. Imported records are not automatically included. Missing fields remain `not reported`.

Transport failures, malformed responses, and quota/rate limits leave affected records unresolved and never create exclusions. Completed decisions remain preserved if a batch stops.

Counts come from stored records and explicit decisions. Only explicit negative screening decisions count as exclusions. Heterogeneous evidence defaults to narrative synthesis; quantitative pooling requires explicit comparable effect data.

Quantitative findings explicitly reported in included-record evidence are first-class evidence. Preserve study-level numerical values, units, p-values, confidence intervals, effect estimates, sample sizes, test statistics, and model metrics when present. Do not omit such results simply because they occur in an abstract field. Do not infer missing statistics or statistical significance. The manuscript renderer should report supported numerical findings directly and use normal scholarly citations.

Abstract validation normalizes presentation-only research-question labels. Both `RQ1: question` and `RQ1 (label): question` are reduced to the question content before evidence-claim validation, while all evidence safeguards remain active.
