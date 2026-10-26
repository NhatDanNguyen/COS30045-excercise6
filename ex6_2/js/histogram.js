const drawHistogram = (data) => {
    // Use a responsive SVG and translate the inner chart by the margins.
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("role", "img")
        .attr("aria-labelledby", "histogram-title histogram-description");

    svg.append("title")
        .attr("id", "histogram-title")
        .text("Distribution of TV energy consumption");
    svg.append("desc")
        .attr("id", "histogram-description")
        .text(`Frequency of TVs by labeled annual energy consumption in kWh/year. Showing all ${data.length} supplied records, including the high-consumption outlier.`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Default D3 binning gives this dataset 14 bins of 200 kWh/year.
    const bins = binGenerator(data);
    console.log("Histogram bins:", bins);

    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);
    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // Keep the original boundaries when binning a subset. Otherwise D3's
    // automatic binning could change the intervals while the axes stay fixed.
    binGenerator.domain([minEng, maxEng])
        .thresholds(bins.slice(1).map(d => d.x0));

    xScale.domain([minEng, maxEng]).range([0, innerWidth]);
    // SVG y coordinates increase downwards, so reverse the y range.
    yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        // Matching the background creates narrow gaps without shifting bins.
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    innerChart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(14));
    innerChart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).ticks(14));

    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "end")
        .text("Labeled Energy Consumption (kWh/year)");
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", -40)
        .attr("y", -20)
        .text("Frequency");
};
