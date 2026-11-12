
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
 // TODO: Students implement this function
  // Requirements:
  // - Use a real HTML <table>, with <th> header cells and a <caption> saying what the table shows
  // - Include the 4-6 most useful fields
  // - Show "Not listed" instead of undefined when a value is missing
  // - Optional: add sorting
  
  function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
  }
  
  function orNotListedsecond(value) {
  return value === '------' || value === 'N/A' || value === undefined ? '' : value;
  }

  function showTable(data) {
  console.log("MY TABLE FILE IS RUNNING");
  const rowsHTML = data.map(
       /*html*/ 
      (inspection) => `
                <tr>
                <td>${orNotListed(inspection.name)}</td>    
                <td>${orNotListed(inspection.category)}</td>
                <td>${inspection.address_line_1}, ${orNotListedsecond(inspection.address_line_2)} ${inspection.city}, ${inspection.state}</td>
                <td>${inspection.inspection_date}</td>
                    <td>${orNotListed(inspection.inspection_results)}</td> 
                </tr>
            `
    )
    .join("");
     /*html*/ 
  return `
                <h2 class = "view-title"> Table view - For Inspectors</h2>
                <table class="restaurant-table">
                <caption><i>Table showing the name, category, location and inspection results for each restaurant </i></caption>
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date of Insp</th>
                    <th scope="col">Inspection Results</th>
                    </tr>
                </thead>
                <tbody> 
                   ${rowsHTML} 
                   </tbody>
            `;
}

export default showTable;