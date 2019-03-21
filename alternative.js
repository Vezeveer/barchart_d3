const width = 800;
const height = 400;
const padding = 50;
const innerWidth = width - padding;
const innerHeight = height - padding;
const bcContainer = d3.select('.barchartContainer');

const svg = d3.select('.barchart')
  .attr('width', width + 150)
  .attr('height', height + 150)

bcContainer.append('div')
  .attr('id', 'tooltip')
  .append('text')
  .text('sdfsldfsa')

//render function starts here
function render(data) {
  const GDP = data.data.map(d => d[1])
  const yearsArray = data.data.map(d => new Date(d[0]))
  const maxGDP = d3.max(GDP)

  const yearsScale = d3.scaleTime(yearsArray)
    .domain([d3.min(yearsArray), d3.max(yearsArray)])
    .range([0, width])

  const xScaleGDP = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([0, height])

  const GDPscaled = GDP.map(d => xScaleGDP(d))

  const xScaleGDPrev = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([height, 0])

  const yAxis = d3.axisLeft(xScaleGDPrev)
  const xAxis = d3.axisBottom(yearsScale)

  const bottomAxisGroup = svg.append('g')
    .attr('id', 'x-axis')
    .call(xAxis)
    .attr('transform', `translate(${100},${height + 50})`)

  const leftAxisGroup = svg.append('g')
    .attr('id', 'y-axis')
    .call(yAxis)
    .attr('transform', `translate(${100},50)`)

  svg.selectAll('rect')
    .data(GDPscaled)
    .enter()
    .append('rect')
    .attr('width', width / GDP.length)
    .attr('height', d => d)
    .attr('x', (d, i) => yearsScale(yearsArray[i]))
    .attr('y', d => height - d + 50)
    .attr('class', 'bar')
    .attr('data-date', (d, i) => data.data[i][0])
    .attr('data-gdp', (d, i) => GDP[i])
    .attr('fill', 'steelblue')
    .attr('transform', 'translate(100,0)')
    .on('mouseover', function () {

      d3.select('#tooltip').style('display', 'block')
      setTimeout(() => {
        d3.select('#tooltip').style('display', 'none')

      }, 3000)

    })
    // .on('mouseout', function () {
    //   setTimeout(() => {
    //     d3.select('#tooltip').style('display', 'none')
    //   }, 500)
    // })
    .on('mousemove', function (d, i) {
      let xPos = d3.mouse(this)[0] - 10
      let yPos = d3.mouse(this)[1] - 20
      d3.select('#tooltip')
        .style('left', `${xPos}px`)
        .attr('data-date', data.data[i][0])
        .select('text').text(data.data[i][0] + ", $" + data.data[i][1])
    })

  // const tooltip = svg.append('g')
  //   .attr('class', 'tooltip')
  //   .attr('id', 'tooltip')
  //   .style('display', 'none')

  // tooltip.append('text')
  //   .attr('x', 0)
  //   .style('font-size', '30px')
  //   .style('z-index', '5')

  // tooltip.append('rect')
  //   .attr('width', 150)
  //   .attr('height', 50)
  //   .attr('y', -40)
  //   .attr('fill', 'rgba(103, 143, 103, 0.411)')

}



//https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json

fetch("./data.json")
  .then(res => res.json())
  .then(data => {

    render(data)
  })


