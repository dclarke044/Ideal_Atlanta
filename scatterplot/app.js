var svgWidth = 1200;
var svgHeight = 700;

var margin = {
    top: 20,
    right: 80,
    bottom: 60,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

 // Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins. 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

// Append an SVG group
var whiteGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
var blackGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
var otherGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
var hispGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
var asianGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// var scatterxaxis = "pop"

// Read in data file using D3(version 5 version 4 does not use .then)
d3.csv("City_of_Atlanta_Neighborhood.csv").then((chartData) =>{
    console.log(chartData)
    
    // Parse Data 
    chartData.forEach((data)=> {
        data.pop = +data.pop;
        data.white = +data.white;
        data.black = +data.black;
        data.other = +data.other;
        data.asian = +data.asian;
        data.hispanic = +data.hispanic;
        // data.neighborhood = +data.neighborhood
    });

    // Create scale functions for x and why
    // remember logic from Devang: Json and Dictionary are essentially the same thing
    //it has arrays and the arrays has keys and values in order to understand each line of code
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(chartData, d => d.pop)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([-2, d3.max(chartData, d => d.white)])
        .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    whiteGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    whiteGroup.append("g")
        .call(leftAxis);

    blackGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    blackGroup.append("g")
        .call(leftAxis);
    
    otherGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    otherGroup.append('g')
        .call(leftAxis);

    hispGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    hispGroup.append('g')
        .call(leftAxis);

    asianGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    asianGroup.append('g')
        .call(leftAxis);
    
    // Create (green) circles
    var whiteCircles = whiteGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.pop))
    .attr("cy", d => yLinearScale(d.white))
    .attr("r", "10")
    .attr("fill", "green")
    .attr("opacity", ".6");
    
    // Create (blue) circles
    var blackCircles = blackGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.pop))
    .attr("cy", d => yLinearScale(d.black))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5"); 

    // Create (black) circles
    var otherCircles = otherGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.pop))
    .attr("cy", d => yLinearScale(d.other))
    .attr("r", "10")
    .attr("fill", "black")
    .attr("opacity", ".5"); 

    // Create (red) circles
    var hispCircles = hispGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.pop))
    .attr("cy", d => yLinearScale(d.hispanic))
    .attr("r", "10")
    .attr("fill", "red")
    .attr("opacity", ".5");

    // Create (yellow) circles 
    var asianCircles = asianGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.pop))
    .attr("cy", d => yLinearScale(d.asian))
    .attr("r", "10")
    .attr("fill", "yellow")
    .attr("opacity", ".5");


    // Initialize tooltip... make sure versions are correct.. that was the problem the first time I did this
    var toolTip_white = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
         return (`${d.neighborhood}<br> Population: ${d.pop}<br> Demographic: ${d.white}% White`);
        });
    var toolTip_black = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
         return (`${d.neighborhood}<br> Population: ${d.pop}<br> Demographic: ${d.black}% Black`);
        });
    var toolTip_other = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
         return (`${d.neighborhood}<br> Population: ${d.pop}<br> Demographic: ${d.other}% other`);
        });
    var toolTip_hisp = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
         return (`${d.neighborhood}<br> Population: ${d.pop}<br> Demographic: ${+d.hispanic}% Hispanic`);
        });
    var toolTip_asian = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
         return (`${d.neighborhood}<br> Population: ${d.pop}<br> demographic: ${d.asian}% Asian`);
        });

    // Create tooltip in the chart
    whiteCircles.call(toolTip_white);

    // Create event listeners to display and hide the tooltip
    whiteCircles.on("mouseover", function(data) {
        toolTip_white.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
        toolTip_white.hide(data);
        });

    // Create tooltip in the chart
    blackCircles.call(toolTip_black);

    // Create event listeners to display and hide the tooltip
    blackCircles.on("mouseover", function(data) {
        toolTip_black.show(data, this);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
        toolTip_black.hide(data);
        });

    // Create tooltip in the chart
    otherCircles.call(toolTip_other);

    // Create event listeners to display and hide the tooltip
    otherCircles.on("mouseover", function(data) {
        toolTip_other.show(data, this);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip_other.hide(data);
        });
  
    // Create tooltip in the chart
    hispCircles.call(toolTip_hisp);

    // Create event listeners to display and hide the tooltip
    hispCircles.on("mouseover", function(data) {
        toolTip_hisp.show(data, this);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip_hisp.hide(data);
        });

    // Create tooltip in the chart
    asianCircles.call(toolTip_asian);

    // Create event listeners to display and hide the tooltip
    asianCircles.on("mouseover", function(data) {
        toolTip_asian.show(data, this);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip_asian.hide(data);
        });

      // Create axes labels
    whiteGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 5)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Demographic");

    whiteGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Population");
    }).catch(function(error) {
      console.log(error);
});
