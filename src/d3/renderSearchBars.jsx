import * as d3 from 'd3';

export const renderSearchBars = (svg, data, state, visitedIndices) => {
  if (!svg || !data || !Array.isArray(data)) return;

  const width = +svg.attr('width');
  const height = +svg.attr('height');
  if (!width || !height) return;

  const barWidth = width / data.length;

  // Dynamic scaling for bar height
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height - 20]); // leave space for labels

  // BARS
  const bars = svg.selectAll('rect').data(data, (_, i) => i);

  bars.enter()
    .append('rect')
    .attr('x', (_, i) => i * barWidth)
    .attr('y', height)
    .attr('width', barWidth - 4)
    .attr('height', 0)
    .attr('fill', '#555')
    .merge(bars)
    .transition().duration(300)
    .attr('x', (_, i) => i * barWidth)
    .attr('y', d => height - yScale(d))
    .attr('height', d => yScale(d))
    .attr('fill', (_, i) => {
      if (i === state.foundIndex) return '#28a745'; // green
      if (visitedIndices.includes(i)) return '#007bff'; // blue
      return '#555'; // default gray
    });

  bars.exit().remove();

  // LABELS
  const labels = svg.selectAll('text').data(data, (_, i) => i);

  labels.enter()
    .append('text')
    .attr('x', (_, i) => i * barWidth + barWidth / 2)
    .attr('y', height)
    .attr('text-anchor', 'middle')
    .attr('fill', '#eee')
    .text(d => d)
    .merge(labels)
    .transition().duration(300)
    .attr('x', (_, i) => i * barWidth + barWidth / 2)
    .attr('y', height - 5);

  labels.exit().remove();
};