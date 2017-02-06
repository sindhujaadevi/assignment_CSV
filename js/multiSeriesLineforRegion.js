let	margin = {top: 30, right: 40, bottom: 30, left: 50};
let	width = 600 - margin.left - margin.right;
let	height = 270 - margin.top - margin.bottom;
// let d3;
let x = d3.scale.ordinal().rangeRoundBands([0, width], 1, 1);
let	y = d3.scale.linear().range([height, 0]);
let	xAxis = d3.svg.axis().scale(x).orient('bottom');
let	yAxis = d3.svg.axis().scale(y).orient('left');
let	valueline = d3.svg.line()
	.x(function(d) { return x(d.Country); })
	.y(function(d) { return y(d.Fat); });
let	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.Country); })
	.y(function(d) { return y(d.Protein); });
  let	valueline3 = d3.svg.line()
	.x(function(d) { return x(d.Country); })
	.y(function(d) { return y(d.carbohydrates); });
let	svg = d3.select('#multiline')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.json('../outputdata/multiLineChart.json', function(error, data) {
	data.forEach(function(d) {
		d.Country = d.Country;
		d.Fat = +d.Fat;
		d.Protein = +d.Protein;
	});

  x.domain(data.map(function(d) {
      return d.Country;
  }));
	// Scale the range of the data
	// x.domain(d3.extent(data, function(d) { return d.Country; }));
	y.domain([0, d3.max(data, function(d) { return Math.max(d.Fat, d.Protein, d.carbohydrates); })]);
// Add the valueline path.
	svg.append('path')
		.attr('class', 'line')
    .style('stroke', 'red')
		.attr('d', valueline(data));
	// Add the valueline2 path.
	svg.append('path')
		.attr('class', 'line')
		.style('stroke', 'green')
		.attr('d', valueline2(data));
// Add the valueline2 path.
    svg.append('path')
      .attr('class', 'line')
      .style('stroke', 'blue')
      .attr('d', valueline3(data));

	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);

	svg.append('text')
		.attr('transform', 'translate(' + (width - 8) + ',' + y(data[0].Fat) + ')')
		.attr('dy', '.35em')
		.attr('text-anchor', 'start')
		.style('fill', 'red')
		.text('fat_100g');

	svg.append('text')
		.attr('transform', 'translate(' + (width - 30) + ',' + y(data[0].Protein) + ')')
		.attr('dy', '1em')
		.attr('text-anchor', 'start')
		.style('fill', 'green')
		.text('proteins_100g');

    svg.append('text')
      .attr('transform', 'translate(' + (width - 60) + ',' + y(data[0].carbohydrates) + ')')
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .style('fill', 'blue')
      .text('carbohydrates_100g');
});
