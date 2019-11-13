if (account_id == null || account_info.rank == 0) window.location.href = 'index.html';

$(document).ready(function () {
	$.ajax({
		async: false,
		url: "js/libs/bootstable.js",
		dataType: "script"
	});

	if (account_info.rank != 2) {$("a.admin-tabs").eq(1).hide();}else{
		
	}

	$('table#flight').SetEditable({
		$addButton: $('#add_flight'),
		columnsEd: "1,2,3,4,5,6,7,8,9,10,11"
	});

	var data = TableToCSV('makeEditable', ',');


	$('#flight-table-tab').click(function () {

	});
});