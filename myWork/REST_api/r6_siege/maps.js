$(document).ready(start);

var currentMapId;

function start() {
    loadTable();
}
function loadTable() {
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
	$.get("api/maps/index.php",function(data) {
		for (ix=0; ix<data.length; ix++) {
			map = data[ix];

			btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + map.id + "'>"; 

			btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + map.id + "'>"; 

            rowHTML = "<tr><td>"+map.name+"</td><td>"+map.floors+"</td><td>"+map.operator+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
            $("#tblLeads tbody").append(rowHTML);
            //console.log(rowHTML);
		}
		$('.btnEdit').click(editPressed);
		$('.btnDelete').click(deletePressed);
	},"json");
}

function editPressed(evt) {
    $("#divFields").show();
    $("#submitClick").hide();
    $("#editSubmit").show();
    $("#showButton").hide();
	id=$(evt.target).attr("data-id");
    currentMapId = id;
	$("#btnSave").attr("data-type", "edit").attr("data-id", id);
	map={id: id};
	$.get("api/maps/index.php", map,populateEditFields,  "json");
}

function deletePressed(evt) {
    let id=$(evt.target).attr("data-id");
    if (confirm("Delete this map?")) {
		map={id: id};
		$.delete("api/maps/index.php", map,loadTable);
	}
}

function showForm() {
    $("#divFields").show();
    $("#submitClick").show();
    $("#showButton").hide();
    $("#editSubmit").hide();
}

function submitClick() {
    map = {
        name: $("#txtName").val(),
        floors: $("#txtFloor").val(),
        operator:  $("#txtOperator").val()
    };
    console.log(map);
    $.post("api/maps/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#submitClick").hide();
    clearEditFields();
}
function submitEditClick() {
    map = {
        id: currentMapId,
        name: $("#txtName").val(),
        floors: $("#txtFloor").val(),
        operator:  $("#txtOperator").val()
    };
    console.log(map.id);
    $.put("api/maps/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#editSubmit").hide();
    clearEditFields();
}


function validateForm() {
	// simple required field validation
	flag = true;
	$(".txtName").each(function(index, value) {
		if ($(value).attr("required") == "required" && $(value).val() == '') {
			flag = false;
			$(value).css("background-color","pink");
			$(value).attr("placeholder", "* required");
		} else {
			// field good
			$(value).css("background-color","white");
			$(value).attr("placeholder", "");			
		}
	});
	return flag;
}

function clearEditFields() {
	$("#txtName").val("");
	$("#txtFloor").val("");
	$("#txtOperator").val("");
}

function populateEditFields(data) {
    clearEditFields();
    $("#txtName").val(data[0].name);
	$("#txtFloor").val(data[0].floors);
	$("#txtOperator").val(data[0].operator);
}

jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
   
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
