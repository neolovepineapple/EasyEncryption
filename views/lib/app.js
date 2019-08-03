function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getData(){
	var text = $("#inputText").val();
	var key = $("#key").val();
	var checked = $("#option1")[0].checked;
	return {textContent: text,
			key: key,
			encryption: checked};

}


$("#button-addon").click(function(){
	var key = makeid(16);
	$("#key").val(key);
});


$("#startBtn").click(function(){
	var data = getData();
	console.log(data);
});


$('#startBtn').click(function() {
    var dat = getData();
	
	
    $.ajax({
        url: "/sendData",
        type: "POST",
        dataType: "text",
        data: JSON.stringify(dat),
        contentType: "application/json",
		cache: false,
        timeout: 5000,
        complete: function() {
                  //called when complete
			//console.log('process complete');
			
        },

        success: function(data) {
              console.log(data);
			  $("#outputContent").val(data);
              console.log('process sucess');
		},

        error: function() {
			$("#outputContent").val("Oops! Our servers is currently down");
			console.log('process error');
		},
	});
});