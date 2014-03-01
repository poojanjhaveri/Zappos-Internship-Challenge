(function(){
	
	
	Parse.initialize("4MbYCnaXjBK2aFxFLBJGjGK88iHF5kZ9AQCCxLKz", "Rzu57Wq5czKHCDCrR1htKmdzntHR2s6tRUcH133J");
	var AlertList = Parse.Object.extend("AlertList");
	console.log("HeyParse");
	
	window.ParseApp={
		Send:{	
					saveAlert:function(object)
					{
						var itemtosave =  new AlertList();
						 
						itemtosave.set("Item", object);
						itemtosave.set("ItemStyleId", object.styleId);
						itemtosave.set("Email","pjhaveri@usc.edu");
						itemtosave.save(null, {
						success: function() {
						  // Execute any logic that should take place after the object is saved.
						 alert('Price Alert Created for '+ object.brandName+ " "+object.productName);
						},
						error: function(gameScore, error) {
						  // Execute any logic that should take place if the save fails.
						  // error is a Parse.Error with an error code and description.
						  alert('Failed to create new object, with error code: ' + error.description);
						}
					  });
						
						
					}
		},
		
		Check:{
			sendAlert:function(object)
			{
				console.log(object);
				var query = new Parse.Query(AlertList);
				query.equalTo("ItemStyleId", object.styleId);
				query.find({
				success: function(results) {
				  for(var i=0;i<results.length;i++)
				  {
					  $.ajax({
							   type: "GET",
							   url: "php/sendmail.php",
							   data: {email:results[i].get('Email'),
							   productURL:results[i].get("Item").productUrl,
							   productName:results[i].get("Item").productName,
							   brandName:results[i].get("Item").brandName,
				
							   },
							   success: function(phpReturnResult){
									console.log("Email sent");
									alert('Email Alert Sent');
							   },
							   error: function(errormessage) {
							   }
						  });
					  
				  }
				},
				error: function(error) {
			//	  alert("Error: " + error.code + " " + error.message);
				}
			  });
				
				
			}
		}
	}
	
})();