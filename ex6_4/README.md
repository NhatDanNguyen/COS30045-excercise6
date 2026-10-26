# Exercise 6.4 — Tooltips

This exercise adds screen-size tooltips to the existing TV energy-consumption
scatterplot. The histogram, technology filters, chart dimensions, colours and
page styling from the earlier exercises are retained.

## Run locally

From this `ex6_4` directory, start a web server:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/html/index.html>. Stop the server with `Ctrl+C`.
VS Code Live Server is also suitable if it serves this directory and opens
`html/index.html`. Do not open the HTML directly with `file://`: D3 fetches the
CSV over HTTP. An internet connection is needed for D3 v7 and Google Fonts.

Use All, LED, LCD and OLED to filter the histogram. Hover over a scatterplot
circle to display its screen size in inches. The scatterplot always shows all
TVs; its colours identify screen technology.

## Files

- `html/index.html`: page, stylesheet paths and ordered deferred scripts.
- `css/base.css`, `css/visualisation.css`: existing page and responsive SVG styles.
- `data/Ex6_TVdata_withStar.csv`: supplied dataset, preserved without edits.
- `js/shared-constants.js`: dimensions, scales, colours, filters and tooltip size.
- `js/histogram.js`: histogram, fixed bin boundaries, axes and labels.
- `js/scatterplot.js`: circles, separate scales, axes and technology legend.
- `js/interactions.js`: histogram filters, tooltip creation and mouse events.
- `js/load-data.js`: CSV parsing and chart/interaction setup.

## Implementation aligned with the brief

1. **Inspect the previous exercises and reference material.** Read the saved
   Exercise 6.4 brief and all ten images, including the code screenshots. The
   existing chart code already parses `screenSize`, `star` and
   `energyConsumption` as numbers in memory and uses the correct relative paths.
   Those working parts were retained.
2. **Set up the new functions.** In `interactions.js`, add separate
   `createTooltip()` and `handleMouseEvents()` functions. Call them from
   `load-data.js` after drawing the scatterplot and populating the existing
   histogram filters, so the circles and tooltip exist before listeners run.
3. **Append the tooltip to `innerChartS`.** Create an SVG group with class
   `tooltip` and initial `.style("opacity", 0)`. Append it after the plot elements
   so it appears above them. Disable pointer events on this group so it cannot
   interfere with mouse events on the circles underneath.
4. **Create the background rectangle.** Use the shared 65 × 32 dimensions,
   `rx` and `ry` of 3, `barColor` and `fill-opacity` of 0.75, following the
   screenshot example.
5. **Create the tooltip text.** Start with `NA`, centre it using half the width
   and half the height plus 2, and use white text with font weight 900.
6. **Handle `mouseenter`.** Attach D3 `.on()` listeners to the scatterplot
   circles. Use the bound datum `d` to display `d.screenSize`. Read `cx` and `cy`
   from the event target using `getAttribute`, then position the tooltip half a
   tooltip-width left and 1.5 tooltip-heights above the circle. Clamp the position
   at the plot's top and side edges to keep the rectangle visible. Fade in over
   200 ms. Retain the brief's mouse-event console messages for inspection.
7. **Handle `mouseleave`.** Interrupt any pending fade-in, set opacity to zero
   and move the tooltip to `translate(0, 500)`, as in the example. Interruption
   prevents a quick departure from allowing the fade-in to reveal it again.
8. **Preserve existing behaviour.** The histogram still uses fixed bins/scales
   and its existing 500 ms filter transitions. The tooltip selects only the
   scatterplot's group and circles, so the two interactions remain independent.
   Update the page title to Exercise 6.4 and explain the hover action on the page.

The brief inconsistently names the loader `data-load.js`; this project already
uses `load-data.js`, so that filename and its working script reference are kept.
The preparation text also refers to Exercise 6.4 itself; its purpose clearly
requires extending the existing Exercise 6.3 scatterplot.

The optional extensions were not implemented: brand/model tooltip content,
histogram tooltips and scatterplot filtering.

## Verification performed with AI assistance

- Ran `node --check` successfully on all five JavaScript files.
- Independently read the UTF-8 CSV: 4,233 TVs, comprising 3,492 LED, 455 LCD and
  286 OLED records. Numeric ranges are 1–8 stars, 16–116 inches and
  56–2,652 kWh/year. The outlier and original screen sizes remain intact.
- Loaded the project over HTTP in the in-app Chromium browser. Confirmed 4,233
  circles, 14 histogram bars, both charts' axis labels and LED/LCD/OLED legend.
- Compared all 14 displayed histogram bin counts with independently calculated
  CSV counts for All, LED, LCD and OLED. All matched. Rapid filter changes also
  returned correctly to All without changing the scatterplot's point count.
- Tested real pointer entry by clicking scatterplot circles. The topmost TV
  showed 114 inches, and a right-edge TV showed 75 inches, matching the CSV.
  The tooltip stayed inside the plot and hid/moved away after pointer departure.
- Visually inspected the desktop charts and a 390 × 844 viewport. The smaller
  layout wrapped the filter buttons and had no horizontal overflow. SVG labels
  become small on narrow screens because the existing charts scale as a whole.
- Browser console inspection reported no warnings or errors during these checks.

These checks cover the tested Chromium session, not every browser or every
individual hover target. Touch-only interaction was not tested; the required
interaction is mouse hover. Offline dependency loading was not tested.

Dataset SHA-256:
`ffd4e7eb94a3bc957d20b59a24a222f9fdfb975eb0403bef2413b6b060924d61`.

## AI declaration

The author used OpenAI Codex to read the assignment brief and code screenshots,
inspect the existing project, implement the required SVG tooltip and mouse
listeners, add explanatory comments, update the page text and this README, and
perform syntax, dataset and browser checks. The existing histogram, scatterplot,
styling and supplied CSV were retained. This was implementation and verification
assistance, not only spelling or formatting assistance.

The author remains responsible for reviewing, verifying ang having a general understanding about the code provided.
