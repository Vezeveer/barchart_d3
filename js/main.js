// https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json



const dataset = [10, 50, 30, 40, 50]

const svg1 = d3.select('.barchart')
  .attr('height', 225)
  .attr('widht', 200)

const barchart = svg1.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 50)
  .attr('y', d => 225 - d * 4)
  .attr('width', 45)
  .attr('height', (d, i) => {
    return (d * 4)
  })
  .attr('fill', 'black')
  .attr('class', 'bar')
  .append('title')
  .text(d => d)

svg1.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => i * 50)
  .attr('y', d => 225 - d * 4 - 3)
  .attr('fill', 'green')

