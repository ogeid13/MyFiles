$(document).ready(function(){
	$('#Table').DataTable({
		responsive: true
	});
	
	$(document).on('click', '.glyphicon-trash', function () {
		ModifyDeleteModal($("#Table").DataTable().row($(this).parents('tr')).index());
	});
	
	$(document).on('click', '.glyphicon-edit', function () {
		ModifyModal(true, $("#Table").DataTable().row($(this).parents('tr')).index());
	});
});

function ModifyDeleteModal(index) {
    $("#IdDeleter").val(index);
}

function DeleteRow() {
    var index = $("#IdDeleter").val();
    $("#Table").DataTable()
		.row(index)
		.remove()
		.draw();

    $('#DeleteModal').modal('toggle');
	$('body').removeClass('modal-open');
}

function AddElement() {
    if (ValidateEntries()) {
		
		var Entry = [
				$("#FirstAdd").val(),
				$("#SecondAdd").val(),
				$("#ThirdAdd").val(),
				$("#FourthAdd").val(),
				  '<span class=\"glyphicon glyphicon-edit\"data-toggle=\"modal\" data-target=\"#CreateModal\"></span> ' + ' | '
				+ '<span class=\"glyphicon glyphicon-trash\"data-toggle=\"modal\" data-target=\"#DeleteModal\"></span>'
		];
		
		$("#Table").DataTable()
                .row
                .add(Entry)
                .draw();
		
        $('#CreateModal').modal('toggle');
		$('body').removeClass('modal-open');
    }
}

function ShowEntries(){
	var TablaEntries = [];
	
	var data = $("#Table")
	.DataTable()
    .rows()
    .data();
	
	$(data).each(function(){
		var ActualEntries = {
			aFirstInput : $(this)[0],
			bSecondInput : $(this)[1],
			cThirdInput : $(this)[2],
			dFourthInput : $(this)[3]
		};
		TablaEntries.push(ActualEntries);
	});
	
	var FullObject = {
		aFirst : $("#Input1").val(),
		bSecond : $("#Input2").val(),
		cThird : $("#Input3").val(),
		dFourth : $("#Input4").val(),
		eTableInfo : TablaEntries
	};
	
	console.log(FullObject);
	
}

function ValidateEntries() {
    var flag = true;
		
	$("#Formulario input[type='text']").each(function(){
		if($(this).val().trim() == ""){
			$(this).parent().addClass("has-error");
			flag = false;
		} else {
			$(this).parent().removeClass("has-error");
		}
	});

    return flag;
}

function ModifyModal(edit, index) {
    if (edit) {
        RemoveAddButton(edit);

        $("#FirstAdd").val($("#Table tbody tr:eq(" + index + ") td:eq(0)").text());
        $("#SecondAdd").val($("#Table tbody tr:eq(" + index + ") td:eq(1)").text());
        $("#ThirdAdd").val($("#Table tbody tr:eq(" + index + ") td:eq(2)").text());
        $("#FourthAdd").val($("#Table tbody tr:eq(" + index + ") td:eq(3)").text());
        $("#IdContainer").val(index);

        $("#myModalLabel").text("Edit entry");
    } else {
		RemoveAddButton(edit);
		
		// Removes the values
		$("#Formulario input").val("");
		

        $("#myModalLabel").text("Create a new entry");
    }

	// Removes the error
	$("#Formulario div").removeClass("has-error");
}

function RemoveAddButton(remove){
		if(remove){
			$("#EditBtn").css("display", "block");
			$("#CreateBtn").css("display", "none");
		}else{
			$("#EditBtn").css("display", "none");
			$("#CreateBtn").css("display", "block");
		}
}

function EditElement() {
    if (ValidateEntries()) {

		var Entry = [
				$("#FirstAdd").val(),
				$("#SecondAdd").val(),
				$("#ThirdAdd").val(),
				$("#FourthAdd").val(),
				  '<span class=\"glyphicon glyphicon-edit\"data-toggle=\"modal\" data-target=\"#CreateModal\"></span> ' + ' | '
				+ '<span class=\"glyphicon glyphicon-trash\"data-toggle=\"modal\" data-target=\"#DeleteModal\"></span>'
		];
	
		$("#Table").DataTable()
                .row($("#IdContainer").val())
                .data(Entry)
                .draw();
	
        $('#CreateModal').modal('toggle');
		$('body').removeClass('modal-open');
    }
}