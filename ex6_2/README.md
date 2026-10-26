# Exercise 6.2 — Filters

Adds screen-technology filters to the existing Exercise 6.1 D3 v7 histogram. The supplied folder structure, histogram, orange/cream/brown styling, labels, source attribution and dataset are retained.

## Run locally

1. Open a terminal in this `ex6_2` directory.
2. Start a static web server:

   ```powershell
   python -m http.server 8765 --bind 127.0.0.1
   ```

   On Windows, `py` can replace `python`. If the port is occupied, choose another port and adjust the URL.

3. Open [the histogram](http://127.0.0.1:8765/html/index.html).
4. Select All, LED, LCD or OLED. All starts selected; selecting All again restores every record. Only one filter is active at a time. Buttons also work with Tab followed by Enter or Space.
5. Stop the server with Ctrl+C when finished.

Use HTTP rather than double-clicking the HTML file because D3 fetches the CSV. Internet access is required for the existing D3 script (`https://d3js.org/d3.v7.min.js`) and Google Fonts stylesheet. There is no build step or package installation for running the project.

## Implementation steps aligned with the brief

1. **Inspect Exercise 6.1:** kept the completed histogram and existing `html/`, `css/`, `js/` and `data/` structure. The existing stylesheet and CSV paths were already correct for `html/index.html`.
2. **Set up the filter container:** added `<div id="filters_screen">` above the histogram and changed the page title to Exercise 6.2. The container has an accessible group label.
3. **Load the data:** retained the actual filename `../data/Ex6_TVdata_withStar.csv` and numeric conversion of `screenSize`, `star` and `energyConsumption`. After loading, `load-data.js` calls `drawHistogram(data)` followed by `populateFilters(data)`, as in the brief. CSV values are not edited.
4. **Share the filter definitions:** added the brief's `filters_screen` array in `shared-constants.js`, with `id`, `label` and `isActive` for All, LED, LCD and OLED. Only All is initially active. The bin generator remains in this shared file.
5. **Create buttons:** `populateFilters(data)` in `interactions.js` uses D3's select/data/join pattern to create the four buttons and their initial classes. Native buttons, `aria-pressed`, `aria-controls` and a visible keyboard focus outline expose the selection to keyboard and assistive-technology users.
6. **Style the buttons:** added the saved embedded CSS example to `base.css`, using orange buttons, lighter hover colour and a pale active colour. Corrected the example's `#filters` selector to the actual `#filters_screen` ID. Flex wrapping keeps the buttons within narrow screens.
7. **Handle clicks:** the D3 click listener checks `!d.isActive`, updates each option's state and applies `.classed("active", ...)`. Clicking the currently selected button leaves it selected; selecting another button changes the single active filter. `aria-pressed` follows the same state.
8. **Filter and update:** the nested `updateHistogram(filterId, data)` uses the full data for `"all"` or `data.filter(tv => tv.screenTech === filterId)` otherwise. It generates updated bins, binds them to existing rectangles and animates `y` and `height` for 500 ms using `d3.easeCubicInOut`, following the screenshot. `.interrupt()` lets a new selection update from the current bar heights during rapid clicks. The chart description reports the selected technology and record count.
9. **Keep comparable intervals and axes:** after the initial automatic binning, `histogram.js` fixes the shared bin generator's domain and thresholds to those original boundaries. Without this correction, automatic binning on each subset could change the intervals and number of bins while the example updates only existing bar heights. Every selection therefore uses 14 intervals of 200 kWh/year, an x axis from 0 to 2,800 and a frequency axis from 0 to 1,400. Axis rescaling is not implemented.
10. **Load scripts in dependency order:** retained deferred execution as D3 → shared constants → histogram → interactions → data loader. Functions are defined before the loader calls them, and the HTML is parsed before buttons or chart elements are created. Existing console diagnostics and the visible loading-error message are retained.

The SVG remains 800 × 420 with margins of 40/30/60/70 (top/right/bottom/left), scaled responsively through its `viewBox`. Bars remain grey with cream strokes. The labels remain `Frequency` and `Labeled Energy Consumption (kWh/year)`.

## Required scope and optional experiments

The required technology buttons and animated histogram updates are complete. The brief's screen-size filters and axis-rescaling extensions are omitted. Transition experiments are optional; the implementation uses the screenshot's 500 ms cubic easing without extra controls.

The final reference image appears in the extension section and includes screen-size buttons and a shorter energy axis. This project preserves all supplied records, including the 2,652 kWh/year outlier, and the completed Exercise 6.1 scale. The extra controls and shorter range are not copied. Counts are derived from the supplied CSV rather than inferred from screenshot bar heights.

## Verification performed by the AI assistant

- Read the entire Exercise 6.2 assignment content, inspected all 13 relevant saved images individually (including code, console and output screenshots), and read the locally saved embedded button CSS example. No required Exercise 6.2 image or code example was missing. Recommended lecture/textbook material was not independently consulted.
- All four JavaScript files passed `node --check`.
- An independent Python CSV audit found 4,233 records: 3,492 LED, 455 LCD and 286 OLED. Numeric fields were valid; energy consumption ranges from 56 to 2,652 kWh/year.
- Automated browser verification used installed Chrome 155.0.8059.86 through Playwright and a temporary HTTP server serving the actual project. D3, Google Fonts, the CSV, scripts and styles loaded successfully. No console errors, warnings or failed requests were captured.
- Checked every filter's exact bin counts and rendered rectangle coordinates/heights against an independent CSV calculation. Verified that bin boundaries, rectangle widths and both axes remain fixed; All restores the full data.
- Checked that only one button is active, `aria-pressed` matches it, and repeated clicks, rapid changes, Enter and Space work correctly.
- Inspected desktop screenshots for All and OLED and a 320-pixel mobile screenshot. Automated layout checks at 390 and 320 pixels found no horizontal overflow; labels and buttons stayed within the viewport. The inherited SVG scales its text down on small screens, so desktop viewing is preferable for reading tick labels.

| Energy interval (kWh/year) | All | LED | LCD | OLED |
| --- | ---: | ---: | ---: | ---: |
| 0–<200 | 714 | 551 | 162 | 1 |
| 200–<400 | 1,387 | 1,113 | 150 | 124 |
| 400–<600 | 1,146 | 949 | 94 | 103 |
| 600–<800 | 505 | 449 | 24 | 32 |
| 800–<1,000 | 281 | 244 | 19 | 18 |
| 1,000–<1,200 | 96 | 94 | 0 | 2 |
| 1,200–<1,400 | 62 | 59 | 1 | 2 |
| 1,400–<1,600 | 23 | 23 | 0 | 0 |
| 1,600–<1,800 | 18 | 9 | 5 | 4 |
| 1,800–<2,000 | 0 | 0 | 0 | 0 |
| 2,000–<2,200 | 0 | 0 | 0 | 0 |
| 2,200–<2,400 | 0 | 0 | 0 | 0 |
| 2,400–<2,600 | 0 | 0 | 0 | 0 |
| 2,600–2,800 (upper endpoint included) | 1 | 1 | 0 | 0 |
| **Total** | **4,233** | **3,492** | **455** | **286** |

The CSV's SHA-256 before and after implementation is `FFD4E7EB94A3BC957D20B59A24A222F9FDFB975EB0403BEF2413B6B060924D61`.

Verification was limited to the supplied dataset and Chrome. Other browser engines, screen-reader output and offline loading were not tested. Very small frequencies, including the single-record outlier, have subpixel heights at the fixed scale and can be obscured by the inherited stroke/axis; the records remain in the bins.

## AI declaration

The author used OpenAI Codex to inspect the existing Exercise 6.1 implementation, implement and comment on the filter controls, correct filtered binning, update accessible selection descriptions, and rewrite this README. Codex also checked JavaScript syntax, audited the supplied CSV, ran automated browser tests and inspected rendered screenshots. This assistance included writing code and documentation, rather than only proofreading. The supplied dataset values were preserved.

The author remains responsible for understanding and explaining the implementation and reviewing it before submission.
