// COS30045 Data Visualisation
d3.csv("../data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    star: +d.star,
    energyConsumption: +d.energyConsumption
})).then(data => {
    if (!data.length || data.some(d => !d.brand || !d.model ||
        !["LED", "LCD", "OLED"].includes(d.screenTech) ||
        !Number.isFinite(d.screenSize) || d.screenSize <= 0 ||
        !Number.isFinite(d.star) || d.star < 0 ||
        !Number.isFinite(d.energyConsumption) || d.energyConsumption < 0)) {
        throw new Error("Expected TV records with valid technology and numeric values.");
    }
    d3.select("#filter-count").text(`${d3.format(",")(data.length)} TVs`);

    drawHistogram(data);
    drawScatterplot(data);

    populateFilters(data);

    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading or drawing the TV data:", error);
    const message = document.querySelector("#chart-error");
    message.textContent = "The TV charts could not be loaded. Check your connection and run the project through a local web server.";
    message.hidden = false;
});
