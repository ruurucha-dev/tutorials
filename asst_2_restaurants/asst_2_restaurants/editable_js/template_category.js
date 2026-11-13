/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  /*html*/
  function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

function isMissing(value) {
  return value === '------' || value === 'N/A' || value === undefined || value === '';
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Decide which group an inspection result belongs to
function getGroup(result) {
  if (isMissing(result)) return 'none';
  const r = result.toLowerCase();
  if (r.includes('closed')) return 'closed';
  if (r.includes('non-compliant') || r.includes('violation')) return 'noncompliant';
  if (r.includes('compliant')) return 'compliant';
  return 'none';
}

// Builds one group: a header bar with two numbers, then a small table
function buildGroup(title, records) {
  if (records.length === 0) {
    return `
      <section class="category-section">
        <h3 class="category-header">${title}: 0 inspections</h3>
        <p>No inspections in this group.</p>
      </section>
    `;
  }

  // Second number: the most recent inspection date in this group
  const times = records
    .map((r) => new Date(r.inspection_date).getTime())
    .filter((t) => !isNaN(t));
  const latest = times.length ? formatDate(new Date(Math.max(...times))) : 'Not listed';

  const rows = records
    .map((inspection) => {
      // Build the address from the parts that exist
      const address = [inspection.address_line_1, inspection.address_line_2, inspection.city]
        .filter((part) => !isMissing(part))
        .join(', ');

      return `
        <tr>
          <td>${orNotListed(inspection.name)}</td>
          <td>${orNotListed(inspection.category)}</td>
          <td>${address || 'Not listed'}</td>
          <td>${formatDate(inspection.inspection_date)}</td>
          <td>${orNotListed(inspection.inspection_results)}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <section class="category-section">
      <h3 class="category-header">${title}: ${records.length} inspections · Most recent: ${latest}</h3>
      <table class="restaurant-table">
        <caption>${title}: ${records.length} inspections, most recent on ${latest}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Location</th>
            <th scope="col">Date inspected</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </section>
  `;
}

function showCategories(data) {
  const closed = data.filter((item) => getGroup(item.inspection_results) === 'closed');
  const nonCompliant = data.filter((item) => getGroup(item.inspection_results) === 'noncompliant');
  const compliant = data.filter((item) => getGroup(item.inspection_results) === 'compliant');
  const noResult = data.filter((item) => getGroup(item.inspection_results) === 'none');

  return `
    <h2 class="view-title">📂 Category View</h2>
    <p class="view-description">Inspections grouped by result, most serious first</p>
    ${buildGroup('Closed (to be revisited)', closed)}
    ${buildGroup('Non-compliant / violations', nonCompliant)}
    ${buildGroup('Compliant', compliant)}
    ${buildGroup('No result listed', noResult)}
  `;
}

export default showCategories;