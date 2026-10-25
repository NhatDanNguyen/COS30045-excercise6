// Reserve margins for axes and labels around the inner plotting area.
const width = 800;
const height = 420;
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Shared scales and bin generator can also be reused in Exercise 6.2.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);
