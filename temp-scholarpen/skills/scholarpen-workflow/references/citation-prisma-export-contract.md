# Citation and PRISMA export contract

## Citation state
- Persist exactly one citation style: APA 7th, IEEE, Vancouver, or Harvard.
- Store evidence relationships by stable record ID, never by formatted citation text.
- Apply citation formatting only during render/export.
- Numeric styles use the final included-record order.
- Excluded and unresolved records are never references.
- Changing citation style must not regenerate evidence, synthesis, or AI content.

## Shared PRISMA model
- One adapted PRISMA count model supplies preview and every export.
- One SVG generator supplies on-screen, downloadable SVG/image, Markdown/print representation, and DOCX embedding.
- Counts reconcile the deduplicated review state as included + excluded + unresolved.
- Unresolved records are not silently counted as excluded.
- No full-text stage is rendered unless full-text eligibility was actually performed or explicit valid counts were supplied.
- Manual overrides remain explicitly labeled and never overwrite underlying evidence provenance.

## Export invariant
Preview and every downloaded representation must render from the same citation formatter and PRISMA utilities. Export-specific copies of citation arithmetic or PRISMA calculations are prohibited.
