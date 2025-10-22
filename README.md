
# Adjustable Columns — Beautiful, Resizable Data Tables

## TL;DR — What this project does

`adjustable-columns` is a small React demo that showcases a high-quality, resizable table component built with `react-table` and `styled-components`. Users can drag column edges to adjust widths, search to filter rows, and reset column sizes. It’s designed as a reference implementation for teams that need flexible, user-friendly tables in dashboards and internal tools.

Why this matters: modern data-heavy apps (analytics dashboards, admin panels, CRMs) need flexible tables that let users control data density and visibility. Resizable columns improve discoverability and reduce horizontal scrolling — improving productivity.

---

## Business impact (concise, evidence-backed)

Why invest in a polished, adjustable table component?

- Productivity: Users waste time resizing, scanning or switching contexts when data is cramped or columns are too wide. A study from Nielsen Norman Group shows that better information scent and control reduces task time and errors in data-dense interfaces. Giving users control over column widths reduces friction and can speed up repetitive workflows (e.g., triaging lists, reviewing records).

- Accessibility & customization: Allowing users to adjust column widths improves accessibility for users with low vision or large-text settings — it's a simple personalization that increases product satisfaction and retention.

- Conversion & trust: In enterprise apps, better UX on data displays leads to higher trust and higher conversion of demo-to-paid flows. A Forrester report indicates that improved UX can increase conversion rates and reduce support costs.

- Reusability: Shipping a single, well-documented table component reduces engineering time for future dashboards and increases consistency across products.

Quick stat references:
- Nielsen Norman Group: improved task success and reduced time-on-task for interfaces that follow strong information architecture and affordance principles.
- Forrester: companies that invest in UX see measurable impacts on revenue and retention.

(These are broad, well-established findings in UX research; cite specifics for your org or industry where possible.)

---

## Functional overview

Features implemented in this demo:

- Resizable columns (drag the edge of a column header)
- Global search across first name, last name, and status fields
- Reset column widths to defaults
- Clean, responsive card layout and table styling
- Minimal state exposure for easy integration into larger apps

These features are intentionally focused: resizable columns + search are the most common immediate needs for data-heavy product users.

---

## Quick technical summary

Tech stack:
- React (functional components + hooks)
- react-table (useBlockLayout + useResizeColumns)
- styled-components for scoped, component-based styling
- No additional state management library — local component state and memoization is sufficient for the demo

Why these choices matter:
- react-table provides a lightweight, headless API for building tables with good performance characteristics and a small API surface for custom UIs.
- useBlockLayout allows precise control of column widths, which is necessary for predictable resizing behavior.
- styled-components keeps styles co-located with components, making it easier to iterate on UX and theme the table for product styling.

Performance considerations:
- The demo uses memoization (React.useMemo) for columns and data to avoid unnecessary rerenders.
- For large datasets, add virtualization (e.g., react-window) to keep render counts low and maintain smooth drag and scroll interactions.

Security & data protection:
- This is a UI demo only; it expects sanitized data provided by the app. Do not send PII to third-party analytics without consent.

---

## Where the important code lives

Key file: `src/App.js` — the demo wiring and the polished UI.

Example: the table reset wiring (excerpt):

```js
// expose react-table resetResizing to parent via ref
React.useEffect(() => {
	if (resetSignalRef) resetSignalRef.current = resetResizing
}, [resetSignalRef, resetResizing])

// button invokes the reset
<button onClick={() => resetRef.current && resetRef.current()}>Reset Resizing</button>
```

Filtering is implemented with memoization to avoid re-filtering on every render:

```js
const filteredData = React.useMemo(() => {
	if (!filter) return originalData
	const q = filter.trim().toLowerCase()
	return originalData.filter(row => (
		String(row.firstName).toLowerCase().includes(q) ||
		String(row.lastName).toLowerCase().includes(q) ||
		String(row.status).toLowerCase().includes(q)
	))
}, [filter, originalData])
```

Resizing is handled by `react-table`'s `useResizeColumns` plugin. The header resizer element is connected with `column.getResizerProps()`.

---

## How to run locally

From the project root:

```bash
npm install
npm start
```

Open http://localhost:3000 and interact with the demo.

---

## How to measure business outcomes (suggested metrics)

If you integrate this component into a product, track metrics before and after rollout:

- Time-on-task for common table workflows (e.g., record triage, review cycles)
- Support tickets related to data display or table usability
- Feature usage: count resizes per session, search usage, and how often users reset sizes
- Retention/engagement of power users who work heavily with tables

Example event schema (analytics):

```json
{
	"event": "table_resize",
	"userId": "...",
	"columnId": "status",
	"newWidth": 210,
	"timestamp": "2025-10-22T12:00:00Z"
}
```

Collecting these events (with user consent) lets you prove ROI: if power users who resize frequently are more engaged, the feature is worth shipping across the product.

---

## Next steps and extension ideas (with business rationale)

- Virtualized rows (react-window): necessary for large datasets; improves rendering and interaction performance — critical to keep power users productive.
- Column reorder & persistence (drag to reorder + save layout): lets users customize dashboards. Business win: increased retention and perceived product value.
- Column show/hide + saved presets: let teams build role-specific views — reduces cognitive load and speeds task completion.
- Export (CSV/XLSX) of current view/columns: makes it easier for users to move data into reports and increases product stickiness.

---

## Development notes & tips

- To integrate in a larger app, extract the table into a reusable component, accept column definitions and a data source prop, and provide callbacks for persistence (e.g., onColumnResize, onColumnOrderChange).
- Add unit tests around the filtering logic and any reducers or model transformations.
- Add end-to-end tests (Cypress/Playwright) for drag behavior and accessibility flows.

---

## A final word: why little details matter

A table is often the central interface in many apps. Small improvements — allowing users to resize columns, filter quickly, and save layouts — compound into big gains in productivity and satisfaction. Treat this demo as a starting point: ship the small, measurable improvements first, instrument them, and iterate based on real user data.

If you'd like, I can:
- Add telemetry hooks for the events discussed above
- Add virtualization and an example with 100k rows
- Add column reorder + persistence

Tell me which next step you'd like and I’ll implement it.
