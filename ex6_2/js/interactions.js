const populateFilters = (data) => {
    // Reuse the chart's fixed scales so technologies can be compared directly.
    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            // Start from the current heights if another button is clicked mid-animation.
            .interrupt()
            .transition()
            .duration(500)
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
            // Clicking the selected button leaves the current filter in place.
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
