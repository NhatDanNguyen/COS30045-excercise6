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
}).catch(error => {
    console.error("Error loading or drawing the TV data:", error);
    const message = document.querySelector("#chart-error");
    message.textContent = "The histogram could not be loaded. Check your connection and run the project through a local web server.";
    message.hidden = false;
});
