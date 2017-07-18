$(document).ready(function(){
	$table = $('#Table').DataTable({
		"order": [[ 1, "desc" ]],
		responsive: true,
		"columnDefs": [
            {
                "targets": [ 5, 6 ],
                "visible": false
            },
			{
				"targets": [ 0 ,7 ],
				"orderable": false
			}
        ]
		
	});
	
	$("#Table tbody").on('click', '.glyphicon-trash', function () {
		ModifyDeleteModal($table.row($(this).parents('tr')).index());
	});
	
	$("#Table tbody").on('click', '.glyphicon-edit', function () {
		ModifyModal(true, $table.row($(this).parents('tr')).index());
		
		addAndRemoveClassByIdElem($(this).parents('tr').children().children("span.glyphicon-minus-sign"),"glyphicon-plus-sign", "glyphicon-minus-sign");
		ShowHide($(this).parents('tr'), true);
	});
	
	$("#Table tbody").on('click', '.glyphicon-plus-sign, .glyphicon-minus-sign', function () {
		ShowHide($(this).parents('tr'), false);
		if($(this).hasClass("glyphicon-plus-sign"))
			addAndRemoveClassByIdElem($(this), "glyphicon-minus-sign", "glyphicon-plus-sign");
		else
			addAndRemoveClassByIdElem($(this), "glyphicon-plus-sign", "glyphicon-minus-sign");
	});
	
	/*var json = $.getJSON("JsonFile.json");
	
	$.getJSON("JsonFile.json", function(json) {
		console.log(json); // this will show the info it in firebug console
	});*/
	
	$.ajax({
		url: 'https://api.myjson.com/bins/tcxyn',
		type: 'GET',
		jsonpCallback: 'myCallback',
		dataType: "json",
		success: function(data) {
			var test = data.items;
			$.each(test, function(index, object){
				var Entry = [
					"<span class=\"glyphicon glyphicon-plus-sign\"></span>",
					object.First,
					object.Second,
					object.Third,
					object.Fourth,
					object.Fifth,
					object.Sixth,
					  '<span class=\"glyphicon glyphicon-edit\"data-toggle=\"modal\" data-target=\"#CreateModal\"></span> ' + ' | '
					+ '<span class=\"glyphicon glyphicon-trash\"data-toggle=\"modal\" data-target=\"#DeleteModal\"></span>'
				];
				
				$table.row.add(Entry).draw();
			});
		}
	});
});

function addAndRemoveClassByIdElem(elementIdentifier, classToAdd, classToRemove){
	$(elementIdentifier).addClass(classToAdd).removeClass(classToRemove);	
}

function ShowHide(tr, hide){
	var row = $table.row(tr);
	
	if(row.child.isShown() || hide){
		//Child is opened, so close it
		row.child.hide();
		tr.removeClass("shown");
	}else{
		//Child is closed, so open it
		row.child(	ExtractInfo(	row.data()	)	).show();
		tr.addClass("shown");
	}
}

function ExtractInfo(Data){
	return "<table>" +
		"<tr>"+
			"<td>Extra one: </td>" + "<td>"+ Data[5] + "</td>"+
		"</tr>"+
		"<tr>"+
			"<td>Extra two: </td>" + "<td>"+ Data[6] + "</td>"+
		"</tr>"+
	"</table>";
}

function ModifyDeleteModal(index) {
    $("#IdDeleter").val(index);
}

function DeleteRow() {
    var index = $("#IdDeleter").val();
	
    $table.row(index).remove().draw();

    $('#DeleteModal').modal('toggle');
	$('body').removeClass('modal-open');
}

function AddElement() {
    if (ValidateEntries()) {
		
		var Entry = [
				"<span class=\"glyphicon glyphicon-plus-sign\"></span>",
				$("#FirstAdd").val(),
				$("#SecondAdd").val(),
				$("#ThirdAdd").val(),
				$("#FourthAdd").val(),
				$("#ExtraOneAdd").val(),
				$("#ExtraTwoAdd").val(),
				  '<span class=\"glyphicon glyphicon-edit\"data-toggle=\"modal\" data-target=\"#CreateModal\"></span> ' + ' | '
				+ '<span class=\"glyphicon glyphicon-trash\"data-toggle=\"modal\" data-target=\"#DeleteModal\"></span>'
		];
		
		$table.row.add(Entry).draw();
		
        $('#CreateModal').modal('toggle');
		$('body').removeClass('modal-open');
    }
}

function ShowEntries(){
	var TablaEntries = [];
	
	var data = $table.rows().data();
	
	$(data).each(function(){
		var ActualEntries = {
			aFirstInput : $(this)[1],
			bSecondInput : $(this)[2],
			cThirdInput : $(this)[3],
			dFourthInput : $(this)[4]
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
		
		var data = $table.row(index).data();

        $("#FirstAdd").val(data[1]);
        $("#SecondAdd").val(data[2]);
        $("#ThirdAdd").val(data[3]);
        $("#FourthAdd").val(data[4]);
		$("#ExtraOneAdd").val(data[5]);
        $("#ExtraTwoAdd").val(data[6]);
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
				"<span class=\"glyphicon glyphicon-plus-sign\"></span>",
				$("#FirstAdd").val(),
				$("#SecondAdd").val(),
				$("#ThirdAdd").val(),
				$("#FourthAdd").val(),
				$("#ExtraOneAdd").val(),
				$("#ExtraTwoAdd").val(),
				  '<span class=\"glyphicon glyphicon-edit\"data-toggle=\"modal\" data-target=\"#CreateModal\"></span> ' + ' | '
				+ '<span class=\"glyphicon glyphicon-trash\"data-toggle=\"modal\" data-target=\"#DeleteModal\"></span>'
		];
	
		$table.row($("#IdContainer").val()).data(Entry).draw();
	
        $('#CreateModal').modal('toggle');
		$('body').removeClass('modal-open');
    }
}