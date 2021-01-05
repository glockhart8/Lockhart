$(document).ready(start);

var currentStudentId;
var currentArrayIndex;

function start() {
    loadTable();
}
function loadTable() {
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
	$.get("api/students/index.php",function(data) {
		for (ix=0; ix<data.length; ix++) {
			student = data[ix];
			btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + student.id + "' data-array='" + ix + "'>"; 
			
			btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + student.id + "'>"; 

            rowHTML = "<tr><td>"+student.lastname+"</td><td>"+student.firstname+"</td><td>"+student.address+"</td><td>"+student.city+"</td><td>"+student.state+"</td><td>"
            +student.zip+"</td><td>"+student.phone+"</td><td>"+student.email+"</td><td>"+student.major+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
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
    currentStudentId = id;
    currentArrayIndex = $(evt.target).attr("data-array");
	$("#btnSave").attr("data-type", "edit").attr("data-id", id);
	map={id: id};
	console.log(map);
	$.get("api/students/index.php", map,populateEditFields, "json");
}

function deletePressed(evt) {
    let id=$(evt.target).attr("data-id");
    currentStudentId = id;
    if (confirm("Delete this Student?")) {
		map={id: currentStudentId};
		//console.log(map);
		$.delete("api/students/index.php", map,loadTable);
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
        lastname: $("#txtLastName").val(),
        firstname: $("#txtFirstName").val(),
        address:  $("#txtAddress").val(),
        city:  $("#txtCity").val(),
        state:  $("#txtState").val(),
        zip:  $("#txtZip").val(),
        phone:  $("#txtPhone").val(),
        email:  $("#txtEmail").val(),
        major:  $("#txtMajor").val()
    };
    console.log(map);
    $.post("api/students/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#submitClick").hide();
    clearEditFields();
}
function submitEditClick() {
    map = {
        id: currentStudentId,
        lastname: $("#txtLastName").val(),
        firstname: $("#txtFirstName").val(),
        address:  $("#txtAddress").val(),
        city:  $("#txtCity").val(),
        state:  $("#txtState").val(),
        zip:  $("#txtZip").val(),
        phone:  $("#txtPhone").val(),
        email:  $("#txtEmail").val(),
        major:  $("#txtMajor").val()
    };
    console.log(map);
    $.put("api/students/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#editSubmit").hide();
    clearEditFields();
}


function validateForm() {
	// simple required field validation
	flag = true;
	$(".txtLastName").each(function(index, value) {
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
	$("#txtFirstName").val("");
	$("#txtLastName").val("");
	$("#txtAddress").val("");
	$("#txtCity").val("");
	$("#txtState").val("");
    $("#txtZip").val("");
    $("#txtPhone").val("");
    $("#txtEmail").val("");
    $("#txtMajor").val("");
}

function populateEditFields(data) {
    clearEditFields();
    console.log(data);
    $("#txtFirstName").val(data[currentArrayIndex].firstname);
	$("#txtLastName").val(data[currentArrayIndex].lastname);
	$("#txtAddress").val(data[currentArrayIndex].address);
	$("#txtCity").val(data[currentArrayIndex].city);
	$("#txtState").val(data[currentArrayIndex].state);
    $("#txtZip").val(data[currentArrayIndex].zip);
    $("#txtPhone").val(data[currentArrayIndex].phone);
    $("#txtEmail").val(data[currentArrayIndex].email);
    $("#txtMajor").val(data[currentArrayIndex].major);
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
