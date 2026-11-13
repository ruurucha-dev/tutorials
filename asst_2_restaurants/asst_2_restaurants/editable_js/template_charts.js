/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */
 


function showCharts(data) {
  // TODO: Replace each TODO sentence below with text that says what that chart shows.
  // Charts are drawn as pictures, so screen readers can't read them.
  /*html*/
  return `
                    <div class="charts-grid">
                    <figure class="chart-figure">
                        <canvas id="chart-one"></canvas>
                        <figcaption class="chart-summary">A bar chart showing the number of restaurants inspected by type</figcaption>
                    </figure>
                    <figure class="chart-figure">
                        <canvas id="chart-two"></canvas>
                        <figcaption class="chart-summary">A bar chart showing the areas of restaurants inspected</figcaption>
                    </figure>
                </div>
            `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }

  // TODO 1: Reshape your data for the first chart.
  // Chart.js doesn't take your array of records.
  // It wants a list of labels and a matching list of numbers.
  // Example: count inspections by type of business.
  //
       const counts = {};
       data.forEach((item) => {
       counts[item.category] = (counts[item.category] || 0) + 1;
     });
       const labels = Object.keys(counts);
       const numbers = Object.values(counts);

  // TODO 2: Draw the first chart into <canvas id="chart-one">.
  // Every chart needs a title, and every axis needs a label.
  //
         new Chart(document.querySelector('#chart-one'), {
         type: 'bar',
         data: {
         labels: labels,
         datasets: [{ label: 'Number of inspections', data: numbers }]
         },
         options: {
         plugins: { title: { display: true, text: 'Inspections by type of business' } },
         scales: {
          x: { title: { display: true, text: 'Type of business' } },
          y: { title: { display: true, text: 'Inspections' }, beginAtZero: true }
         }
         }
         });

  // TODO 3: Reshape your data again, and draw a second chart of a DIFFERENT type
  // (pie, line, scatter...) into <canvas id="chart-two">, answering a different question.
  // Ideas: inspection results as a pie, inspections per month as a line,
  // or how many "Out of Compliance" checks each type of business averages.




const countstwo = {};
       data.forEach((item) => {
       countstwo[item.city] = (countstwo[item.city] || 0) + 1;
     });
       const labelstwo = Object.keys(countstwo);
       const numberstwo = Object.values(countstwo);

       new Chart(document.querySelector('#chart-two'), {
         type: 'pie',
         data: {
         labels: labelstwo,
         datasets: [{ label: 'Number of inspections', data: numberstwo }]
         },
         options: {
         plugins: { title: { display: true, text: 'Inspections by City' } },
         }
         });
}
export { showCharts, drawCharts };