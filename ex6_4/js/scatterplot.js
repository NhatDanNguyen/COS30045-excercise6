// COS30045 Data Visualisation
const drawScatterplot = (data) => {

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-labelledby", "scatterplot-title scatterplot-description");

    svg.append("title")
        .attr("id", "scatterplot-title")
        .text("TV energy consumption by star rating");
    svg.append("desc")
        .attr("id", "scatterplot-description")
        .text(`All ${data.length} supplied TVs plotted by star rating and annual energy consumption in kWh/year. Colour identifies LED, LCD or OLED screen technology.`);

    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScaleS.domain([0, d3.max(data, d => d.star)])
        .range([0, innerWidth]);
    yScaleS.domain([0, d3.max(data, d => d.energyConsumption)])
        .range([innerHeight, 0]);

    colorScale.domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5)
        .append("title")
        .text(d => `${d.brand} ${d.model}: ${d.screenSize} inches, ${d.star} stars, ${d.energyConsumption} kWh/year`);

    innerChartS.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS).ticks(8));
    innerChartS.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScaleS).ticks(14));

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "end")
        .text("Star Rating");
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", -40)
        .attr("y", -20)
        .text("Labeled Energy Consumption (kWh/year)");

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech);
    });
};
