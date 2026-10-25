# Exercise 6.1 — Histogram

A D3 v7 histogram of annual TV energy consumption, completed in the supplied project structure using the Exercise 6.1 assignment brief. The existing orange, cream and brown styling is retained.

## Run locally

1. Open a terminal in this `ex6_1` directory.
2. Start a static web server on an unused port:

   ```powershell
   python -m http.server 8765 --bind 127.0.0.1
   ```

   On Windows, `py` can be used in place of `python`. If the port is occupied, choose another port and update the URL below.

3. Open <http://127.0.0.1:8765/html/index.html>.
4. Open the browser developer console to inspect the loaded records, bins and scale bounds. Stop the server with Ctrl+C when finished.

Use HTTP rather than double-clicking the HTML file: D3 fetches the CSV. Internet access is needed for D3 at `https://d3js.org/d3.v7.min.js` and the existing Google Fonts stylesheet. No package installation or build step is required.

## Implementation steps aligned with the brief

1. **Folders and files:** retained `html/`, `css/`, `js/` and `data/`. Corrected the stylesheet filename from `visulisation.css` to `visualisation.css`. There were no completed JavaScript exercises to preserve; the four script files were empty.
2. **HTML:** corrected relative asset paths for the existing `html/index.html` location, removed an unmatched closing div and retained the supplied headings, data-source link and footer. Scripts use `defer` and execute as D3 → shared constants → histogram → interactions → data loader. Unlike the brief's example ordering, this explicitly defines dependencies before loading and drawing the data.
3. **CSS:** retained `base.css` and separated chart rules into `visualisation.css`. The SVG scales through its `viewBox`, fits the existing maximum-width container and uses the same cream background as the bar strokes.
4. **Load data (`js/load-data.js`):** used the brief's `d3.csv` row conversion pattern with the actual supplied filename, `../data/Ex6_TVdata_withStar.csv`. `screenSize`, `star` and `energyConsumption` become numbers; the text fields are preserved. The loader logs the data and calls `drawHistogram` only after loading succeeds. A failed request or drawing error is reported in the console and on the page.
5. **Shared constants (`js/shared-constants.js`):** defined dimensions, margins, inner dimensions, colours, shared linear scales and `d3.bin().value(d => d.energyConsumption)` as shown in the screenshots. The selected SVG is 800 × 420, with top/right/bottom/left margins of 40/30/60/70.
6. **Histogram setup (`js/histogram.js`):** created the responsive SVG and translated inner chart group using the brief's Dufour and Meeks pattern. Added an accessible chart title and description.
7. **Bins:** used D3's default binning as in the brief, producing 14 bins of 200 kWh/year. Logged the bins for inspection.
8. **Scales:** obtained the x domain from the first bin's `x0` and last bin's `x1`; obtained the y maximum from the largest bin count. Reversed the y range for SVG coordinates and used `.nice()` to round the frequency domain.
9. **Bars:** joined bins to rectangles using the example's x/y/width/height calculations. Grey fill (`#606464`) and a 2-unit cream stroke (`#fffaf0`) reproduce the gaps between bars.
10. **Axes and final output:** added the bottom and left axes, with labels `Labeled Energy Consumption (kWh/year)` and `Frequency`. Kept the full dataset and the 0–2,800 energy domain, matching the final example.

## Required scope and optional work

This completes the static histogram for Exercise 6.1. The `interactions.js` file is retained with an explanatory comment for Exercise 6.2. Filters, the screenshot's future `populateFilters` call, a second chart and experimental bin controls have not been added. Outlier exclusion was optional in the brief; the 2,652 kWh/year record is retained. At the supplied scale, its one-record bar is smaller than one pixel and is largely covered by the bar stroke/axis, as discussed in the brief.

## Verification performed by the AI assistant

- All four JavaScript files passed `node --check`.
- An independent CSV audit found 4,233 records, no invalid numeric values in the three numeric fields, and energy values from 56 to 2,652 kWh/year.
- The browser rendered 14 rectangles whose heights match these bin counts:

  | Energy interval (kWh/year) | Frequency |
  | --- | ---: |
  | 0–<200 | 714 |
  | 200–<400 | 1,387 |
  | 400–<600 | 1,146 |
  | 600–<800 | 505 |
  | 800–<1,000 | 281 |
  | 1,000–<1,200 | 96 |
  | 1,200–<1,400 | 62 |
  | 1,400–<1,600 | 23 |
  | 1,600–<1,800 | 18 |
  | 1,800–<2,000 | 0 |
  | 2,000–<2,200 | 0 |
  | 2,200–<2,400 | 0 |
  | 2,400–<2,600 | 0 |
  | 2,600–2,800 (upper endpoint included) | 1 |
  | **Total** | **4,233** |

- Browser scale diagnostics matched the brief: `minEng: 0`, `maxEng: 2800`, `binsMaxLength: 1387`; the displayed frequency axis ends at 1,400.
- Inspected the chart's desktop appearance, labels, axes, colours and source attribution. At a 390-pixel viewport, the page had no horizontal overflow and both axis labels stayed inside the viewport. SVG text scales down with the chart, so a wider viewport is preferable for reading it.
- No console errors or warnings were captured during the browser check. D3, the CSV, scripts and styles loaded successfully through a local static server. Browser verification used a temporary Node server after port conflicts prevented the initial Python preview from responding.
- The supplied CSV was not edited. Its SHA-256 before and after implementation is `FFD4E7EB94A3BC957D20B59A24A222F9FDFB975EB0403BEF2413B6B060924D61`.

## Reference limitations

The entire assignment content, the three saved embedded HTML/CSS examples and all 21 locally available assignment images were read or visually inspected, including the code screenshots. The dimensions screenshot (`2026-04-06_11-39-41.png`) was linked only to private Canvas and was absent from the saved files. Automatic approval review blocked access to that URL. The author chose to keep dimensions inferred from the available final-output screenshot, so exact agreement with that missing constants screenshot is unverified. Linked lecture slides, the KNIME workflow and the recommended textbook chapter were not supplied locally or independently reviewed; they were supplementary references rather than required inputs for this histogram.

## AI declaration

The author used OpenAI Codex to interpret the supplied assignment brief and code screenshots, inspect the existing project, implement the previously empty D3 scripts, correct HTML/CSS references and script loading, add explanatory comments, and write this README. Codex also audited the CSV, checked JavaScript syntax and inspected the rendered chart and browser console. The supplied dataset values were preserved. The assistance included writing the implementation, not only proofreading or suggesting changes.

The author remains responsible for understanding and explaining the implementation and reviewing it before submission. **Author's personal review status: pending confirmation.** The verification above was performed by the AI assistant; it does not claim that the author personally reviewed or verified every part.
