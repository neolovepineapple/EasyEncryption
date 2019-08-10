$(document).ready(function(){
  
  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    
    // JUST RESPONSE (Not needed)
    var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    var msg = "";
    if (ratingValue > 1) {
        msg = "Thanks! You rated this " + ratingValue + " stars.";
    }
    else {
        msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
    }
	  
	  $.ajax({
        url: "/feedback",
        type: "POST",
        dataType: "text",
        data: JSON.stringify({feedback:ratingValue}),
        contentType: "application/json",
		cache: false,
        timeout: 5000,
        complete: function() {
                  //called when complete
			//console.log('process complete');
			//$(".spinner-grow-sm").toggleClass("spinner");
			responseMessage(msg);
        },

        success: function(data) {

              console.log('process sucess');
		},

        error: function() {
			console.log('process error');
		},
	});
	  
	  
	  
	  
	  
    
  });
  
  
});


function responseMessage(msg) {
  $('.success-box').fadeIn(200);  
  $('.success-box div.text-message').html("<span>" + msg + "</span>");
}



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
	$('#startBtn').text("Loading...");
	//$(".spinner-grow-sm").toggleClass("spinner");
	
	
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
			//$(".spinner-grow-sm").toggleClass("spinner");
			$('#startBtn').text("Start!");
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