// Reserve margins for axes and labels around the inner plotting area.
const width = 800;
const height = 420;
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Shared separately from the histogram so its filters keep their own scales.
let innerChartS;
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Preparation from the brief for the tooltip work in Exercise 6.4.
const tooltipWidth = 65;
const tooltipHeight = 32;

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// The initial chart and filtered updates share these scales and bins.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

// Only one technology filter is active; start with the complete dataset.
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];
