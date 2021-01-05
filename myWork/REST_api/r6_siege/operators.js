$(document).ready(start);

var currentOperatorId;

function start() 
{
    //loadTable();
}

function loadTable() 
{
    $("#divDefs").show();
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
	$.get("api/operators/index.php",function(data) {
		for (ix=0; ix<data.length; ix++) {
			operator = data[ix];

			btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + operator.id + "'>"; 

			btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + operator.id + "'>"; 

            rowHTML = "<tr><td>"+operator.name+"</td><td>"+operator.side+"</td><td>"+operator.speed+"</td><td>"+operator.ability+"</td><td>"+operator.gun+"</td><td>"
            +operator.map+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
            $("#tblLeads tbody").append(rowHTML);
            //console.log(rowHTML);
		}
		$('.btnEdit').click(editPressed);
		$('.btnDelete').click(deletePressed);
	},"json");
}

/* Buttons */

// Add entry button submit
function submitClick() 
{
    map = {
        name: $("#txtName").val(),
        side: $("#txtSide").val(),
        speed:  $("#txtSpeed").val(),
        ability:  $("#txtAbility").val(),
        gun:  $("#txtGun").val(),
        map:  $("#txtMap").val(),
    };
    console.log(map);
    $.post("api/operators/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#submitClick").hide();
    clearEditFields();
}

// Edit entry button submit
function submitEditClick() 
{
    map = {
        id: currentOperatorId,
        name: $("#txtName").val(),
        side: $("#txtSide").val(),
        speed:  $("#txtSpeed").val(),
        ability:  $("#txtAbility").val(),
        gun:  $("#txtGun").val(),
        map:  $("#txtMap").val(),
    };
    console.log(operator.id);
    $.put("api/operators/index.php", map,loadTable);
    
    $("#divFields").hide();
    $("#showButton").show();
    $("#editSubmit").hide();
    clearEditFields();
}

// Edit icon button
function editPressed(evt) 
{
    $("#divFields").show();
    $("#submitClick").hide();
    $("#editSubmit").show();
    $("#showButton").hide();
	id=$(evt.target).attr("data-id");
    currentOperatorId = id;
	$("#btnSave").attr("data-type", "edit").attr("data-id", id);
	map={id: id};
	$.get("api/operators/index.php", map,populateEditFields,  "json");
}

// Delet icon button
function deletePressed(evt) 
{
    let id=$(evt.target).attr("data-id");
    if (confirm("Delete this operator?")) 
    {
		map={id: id};
		$.delete("api/operators/index.php", map,loadTable);
	}
}

// Search by name button
function searchByName() 
{
    $("#divName").show();
    $("#divSide").hide();
    $("#showButton").hide();
    $("#searchNameSubmit").show();
    $("#searchSideSubmit").hide();
}

// Search by side button
function searchBySide() 
{
    $("#divSide").show();
    $("#divName").hide();
    $("#searchSideSubmit").show();
    $("#searchNameSubmit").hide();
}

// Search name submit button
function searchNameSubmit(data)
{
    $("#divDefs").show();
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
    newurl = "api/operators/index.php/?name=" + data.value;

    $.get(newurl,function(data) {
        operator = data[0];

        btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + operator.id + "'>"; 

        btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + operator.id + "'>"; 

        rowHTML = "<tr><td>"+operator.name+"</td><td>"+operator.side+"</td><td>"+operator.speed+"</td><td>"+operator.ability+"</td><td>"+operator.gun+"</td><td>"
        +operator.map+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
        $("#tblLeads tbody").append(rowHTML);

		$('.btnEdit').click(editPressed);
		$('.btnDelete').click(deletePressed);
    },"json");
    $("#divName").hide();
    $("#divSide").hide();
    $("#showButton").hide();
    $("#searchBySide").show();
    $("#searchByName").show();
    $("#searchSideSubmit").hide();
    $("#searchNameSubmit").hide();
    $("#showButton").show();
}

function searchSideSubmit(data)
{
    console.log("gotem?")
    $("#divDefs").show();
	$('#tblLeads tr:gt(0)').remove()
	$('.btnEdit').off("click",editPressed); 
	$('.btnDelete').off("click",deletePressed);
    newurl = "api/operators/index.php/?side=" + data.value;

    $.get(newurl,function(data) {
        for (ix=0; ix<data.length; ix++) {
            operator = data[ix];

            btnEdit = "<img class='btnEdit' src='images/edit.png' alt='Edit ID' height='16' width='16' data-id='" + operator.id + "'>"; 

            btnDelete = "<img class='btnDelete' src='images/trash.png' alt='Delete ID' height='16' width='16' data-id='" + operator.id + "'>"; 

            rowHTML = "<tr><td>"+operator.name+"</td><td>"+operator.side+"</td><td>"+operator.speed+"</td><td>"+operator.ability+"</td><td>"+operator.gun+"</td><td>"
            +operator.map+"</td><td>"+btnEdit+btnDelete+"</td></tr>";
            $("#tblLeads tbody").append(rowHTML);
            console.log(rowHTML);
        }
		$('.btnEdit').click(editPressed);
		$('.btnDelete').click(deletePressed);
    },"json");
    $("#divName").hide();
    $("#divSide").hide();
    $("#showButton").hide();
    $("#searchBySide").show();
    $("#searchByName").show();
    $("#searchSideSubmit").hide();
    $("#searchNameSubmit").hide();
    $("#showButton").show();
}

// Hide all button
function hideAll()
{
    $("#divDefs").hide();
    $("#hideAll").hide();
    $("#showAll").show();
    $("#showButton").show();
}

// Show all button
function showAll()
{
    $("#divName").hide();
    $("#divSide").hide();
    $("#searchBySide").show();
    $("#searchByName").show();
    loadTable()
    $("#hideAll").show();
    $("#showAll").hide();
    $("#searchNameSubmit").hide();
    $("#searchSideSubmit").hide();
    $("#showButton").show();
}

// Brings up form "add entry" button
function showForm() 
{
    $("#divFields").show();
    $("#submitClick").show();
    $("#showButton").hide();
    $("#editSubmit").hide();
}
/* End Buttons*/



/* Edit Fields */
function clearEditFields() 
{
	$("#txtName").val("");
	$("#txtSide").val("");
	$("#txtSpeed").val("");
	$("#txtAbility").val("");
	$("#txtGun").val("");
    $("#txtMap").val("");
}

// Fills edit fields when edit button is pressed
function populateEditFields(data) 
{
    clearEditFields();
    $("#txtName").val(data[0].name);
	$("#txtSide").val(data[0].side);
	$("#txtSpeed").val(data[0].speed);
	$("#txtAbility").val(data[0].ability);
	$("#txtGun").val(data[0].gun);
    $("#txtMap").val(data[0].map);
}
/* End edit fields */


function validateForm() 
{
	// simple required field validation
	flag = true;
    $(".txtName").each(function(index, value) 
    {
        if ($(value).attr("required") == "required" && $(value).val() == '') 
        {
			flag = false;
			$(value).css("background-color","pink");
			$(value).attr("placeholder", "* required");
        } 
        else 
        {
			// field good
			$(value).css("background-color","white");
			$(value).attr("placeholder", "");			
		}
	});
	return flag;
}


jQuery.each( [ "put", "delete" ], function( i, method ) 
{
    jQuery[ method ] = function( url, data, callback, type ) 
    {
      if ( jQuery.isFunction( data ) ) 
      {
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
