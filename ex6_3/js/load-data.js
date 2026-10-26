// Convert numeric columns in memory; keep the supplied CSV unchanged.
d3.csv("../data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    star: +d.star,
    energyConsumption: +d.energyConsumption
})).then(data => {
    console.log("Loaded TV data:", data);
    drawHistogram(data);
    drawScatterplot(data);
    // Build the filters after drawing, so clicks can update existing bars.
    populateFilters(data);
    // Exercise 6.4 will add createTooltip() and handleMouseEvents() here,
    // after the scatterplot circles exist. They are not defined in this brief.
}).catch(error => {
    console.error("Error loading or drawing the TV data:", error);
    const message = document.querySelector("#chart-error");
    message.textContent = "The TV charts could not be loaded. Check your connection and run the project through a local web server.";
    message.hidden = false;
});
