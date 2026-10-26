# Exercise 6.3: TV energy consumption scatterplot

This project builds on the existing Exercise 6.2 histogram and technology filters. A scatterplot below the histogram shows annual energy consumption against star rating, with colour identifying screen technology. The existing orange/cream styling, folder structure, histogram and filter behaviour are retained.

## Run locally

1. Open a terminal in this project folder (`ex6_3`).
2. Start a static web server with Python:

   ```powershell
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. Open [the project page](http://127.0.0.1:8000/html/index.html) in a browser.
4. Stop the server with `Ctrl+C` when finished.

Use HTTP rather than opening the HTML directly: D3 fetches the CSV, which browsers can block on `file://` pages. Internet access is needed for D3 v7 from `d3js.org` and the existing Google Fonts import; a system sans-serif font is the fallback. No build step or npm installation is required. Node.js is only needed for the optional syntax check below.

## Implementation steps aligned with the brief

1. **Inspect the supplied materials and existing work.** The saved `ex6_3.html` assignment page and all nine relevant images were read, including screenshots of shared constants, SVG setup, the colour scale and legend code. The existing histogram, filter code, styles and CSV were inspected before changes.
2. **Set up the scatterplot.** The empty `js/scatter-plot.js` was renamed to `js/scatterplot.js` to match the brief. `html/index.html` now contains `#scatterplot` below `#histogram` and loads the actual script through `../js/scatterplot.js`. Deferred scripts load in dependency order: D3, shared constants, histogram, scatterplot, interactions, then data loading.
3. **Set up shared constants.** `js/shared-constants.js` declares `innerChartS`, `xScaleS`, `yScaleS` and `colorScale`, separately from the histogram scales. The brief's `tooltipWidth = 65` and `tooltipHeight = 32` are included as preparation. The existing 800 × 420 chart dimensions and margins remain unchanged.
4. **Load and parse the data.** `js/load-data.js` retains the existing numeric conversion for `screenSize`, `star` and `energyConsumption`, then passes the same data to `drawHistogram(data)` and `drawScatterplot(data)`. Filters are populated after drawing. The error message now refers to both TV charts. The CSV itself was not edited.
5. **Create the SVG and scales.** `drawScatterplot` uses the brief's responsive `viewBox` and margin-translated group. The x domain is `[0, maximum star rating]`, or `[0, 8]`; the y domain is `[0, maximum energy consumption]`, or `[0, 2652]`. The y range is reversed because SVG coordinates increase downwards. Shared scales are configured rather than redeclared inside the function.
6. **Colour and draw the circles.** The ordinal scale uses `data.map(d => d.screenTech)` and `d3.schemeCategory10`, matching the screenshot. D3 deduplicates the categories in their first-seen order: LED (blue), LCD (orange), OLED (green). Each CSV row produces a radius-4 circle at its star/energy coordinates, with opacity `0.5` and no stroke. No values are removed, jittered or changed.
7. **Add the axes and labels.** Bottom and left axes show star rating and annual consumption. Labels read `Star Rating` and `Labeled Energy Consumption (kWh/year)`. The energy label remains across the top, matching the required example. SVG titles and descriptions explain both charts for assistive technology.
8. **Add the SVG legend.** Following the code screenshot, a group at `(width - 100, margin.top)` contains one row per colour category, spaced 20 units apart. Each row has a 10 × 10 colour rectangle and its technology label.
9. **Preserve completed exercises.** All/LED/LCD/OLED buttons continue to update only the histogram with its existing animation and fixed scales. The scatterplot retains the complete dataset.

## Scope decisions and brief ambiguities

- The preparation text refers to existing Exercise 6.3 code, while the setup explicitly builds on Exercise 6.2. The supplied Exercise 6.2 project was used as the starting point.
- The brief alternates between `data-load.js` and `load-data.js`. The existing `load-data.js` filename is retained, and all references match it.
- The purpose places tooltips in the next exercise, **6.4**, but setup also shows future calls to `createTooltip()` and `handleMouseEvents()`. Their implementations are absent from the supplied brief and project. Their intended location is explained in a comment after chart creation; live calls are deferred to 6.4 to avoid undefined-function errors. Tooltip constants and the shared scatterplot group are ready for that work.
- The screen-technology filter for the scatterplot is explicitly an **extension**, so it was not added. Alternative palettes and rotating the y-axis label are also optional experiments and were not added.

## Verification

Checks performed by the AI assistant on 26 October 2026:

- `node --check` passed for every project JavaScript file. To repeat:

  ```powershell
  Get-ChildItem js/*.js | ForEach-Object { node --check $_.FullName }
  ```

- A real headless Chrome 155 browser loaded the project over local HTTP using the actual D3/font resources. There were no JavaScript errors, console errors, HTTP errors or failed requests during the successful run.
- All 4,233 CSV records had finite numeric plotting values. Counts were LED: 3,492; LCD: 455; OLED: 286. Star ratings range from 1 to 8, screen sizes from 16 to 116, and consumption from 56 to 2,652 kWh/year.
- Every scatterplot circle was checked against its corresponding CSV record for model, screen size, x/y position, colour, opacity and absence of stroke. The maximum-consumption record remains included: TCL `115X955 Max`, star rating 2, consumption 2,652 kWh/year.
- The histogram's 14 bins total 4,233 records. Each filter was clicked and checked for its expected count, final bar geometry and active-button state. Histogram domains remained `[0, 2800]` and `[0, 1400]`; the scatterplot retained 4,233 circles. Rapid filter clicks were also exercised.
- Legend labels/colours and axis labels were checked. All SVG text stayed within its SVG bounds. Full-page screenshots at 1440 × 1100 and 390 × 844 viewports were visually inspected against the assignment examples, with no horizontal page overflow.
- The supplied CSV's SHA-256 digest is `ffd4e7eb94a3bc957d20b59a24a222f9fdfb975eb0403bef2413b6b060924d61`; its contents were preserved.

Limitations: browser testing covered Chrome, not Firefox, Safari or physical mobile devices. The existing responsive SVG scales chart text down on narrow screens, so desktop viewing is clearer. Offline operation and deliberately failed-resource scenarios were not tested. Exercise 6.4 tooltip behaviour cannot be verified from this brief because its implementation is outside the supplied material.

## AI declaration

OpenAI Codex assisted the author by inspecting the existing project, implementing the scatterplot and legend, correcting script references, adding explanatory comments, writing this README, and performing syntax, data and browser checks. The CSV values were not changed. Existing histogram, parsing, filtering and styling work was reused.

The author is responsible for verifying, testing and having a general understanding about the code provided. 
