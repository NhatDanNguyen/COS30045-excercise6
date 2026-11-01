// COS30045 Data Visualisation
const populateFilters = (data) => {

    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);
        d3.select("#filter-count").text(`${d3.format(",")(updatedData.length)} TVs`);
        d3.selectAll("#histogram rect title").data(updatedBins)
            .text(d => `${d.x0}–${d.x1} kWh/year: ${d.length} TVs`);

        d3.selectAll("#histogram rect")
            .data(updatedBins)

            .interrupt()
            .transition()
            .duration(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));

        d3.select("#histogram-description")
            .text(`Frequency of TVs by labeled annual energy consumption in kWh/year. Showing ${updatedData.length} TVs for ${filterId === "all" ? "all screen technologies" : filterId}.`);
    };

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("type", "button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .attr("aria-pressed", d => d.isActive)
        .attr("aria-controls", "histogram")
        .text(d => d.label)
        .on("click", (event, d) => {

            if (!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });

                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.isActive)
                    .attr("aria-pressed", filter => filter.isActive);

                updateHistogram(d.id, data);
            }
        });
};

const createTooltip = () => {

    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)

        .style("pointer-events", "none");

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    innerChartS.selectAll("circle")
        .on("mouseenter click", (e, d) => {

            tooltip.select("text").text(d.screenSize);

            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            const x = Math.max(0, Math.min(innerWidth - tooltipWidth, cx - 0.5 * tooltipWidth));
            const y = Math.max(0, cy - 1.5 * tooltipHeight);

            tooltip.interrupt()
                .attr("transform", `translate(${x}, ${y})`)
                .transition()
                .duration(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {

            tooltip.interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};

document.querySelector("#scatterplot").addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() !== "circle") {
        innerChartS.select(".tooltip").interrupt().style("opacity", 0);
    }
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && innerChartS) {
        innerChartS.select(".tooltip").interrupt().style("opacity", 0);
    }
});
