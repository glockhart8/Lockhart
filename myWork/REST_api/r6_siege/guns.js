$(document).ready(start);

var currentGunId;

function start() {
    loadTable();
}
function loadTable() {
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
	$.get("api/guns/index.php",function(data) {
		for (ix=0; ix<data.length; ix++) {
			gun = data[ix];

			btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + gun.id + "'>"; 

			btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + gun.id + "'>"; 

            rowHTML = "<tr><td>"+gun.name+"</td><td>"+gun.damage+"</td><td>"+gun.operator+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
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
    currentGunId = id;
	$("#btnSave").attr("data-type", "edit").attr("data-id", id);
	map={id: id};
	$.get("api/guns/index.php", map,populateEditFields,  "json");
}

function deletePressed(evt) {
    let id=$(evt.target).attr("data-id");
    if (confirm("Delete this gun?")) {
		map={id: id};
		$.delete("api/guns/index.php", map,loadTable);
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
        damage: $("#txtDamage").val(),
        operator:  $("#txtOperator").val()
    };
    console.log(map);
    $.post("api/guns/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#submitClick").hide();
    clearEditFields();
}
function submitEditClick() {
    map = {
        id: currentGunId,
        name: $("#txtName").val(),
        damage: $("#txtDamage").val(),
        operator:  $("#txtOperator").val()
    };
    console.log(gun.id);
    $.put("api/guns/index.php", map,loadTable);
    
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
	$("#txtDamage").val("");
	$("#txtOperator").val("");
}

function populateEditFields(data) {
    clearEditFields();
    $("#txtName").val(data[0].name);
	$("#txtDamage").val(data[0].damage);
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
