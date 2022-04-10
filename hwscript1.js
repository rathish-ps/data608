var tabulate = function (data,columns,divName) {
  var table = d3.select('#'+divName).append('table')
	var thead = table.append('thead')
	var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })

  return table;
}
function clear_data(divName) {
  var table = d3.select('#'+divName).selectAll("table").remove();
}

function generateTable(){
	clear_data("dvCSV");
d3.csv('presidents.csv',function (data) {
	var columns = ['Name','Height','Weight']
  tabulate(data,columns,"dvCSV")
})
}

function filterData(){
 clear_data("filter_result");
 filterInput = document.getElementById('filter_data').value
 if(filterInput)
   filterInput = filterInput.toLowerCase();
 d3.csv('presidents.csv',function (data) {
	var columns = ['Name','Height','Weight']
	var subset = data.filter( function(d) { return d.Name.toLowerCase().indexOf( filterInput ) !== -1 } ); 
  tabulate(subset,columns,"filter_result")
 })
}

function clearFilterData(){
	clear_data("filter_result");
}