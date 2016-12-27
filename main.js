jQuery(function () 
 {
	 jQuery("#f_elem_city").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#f_elem_city").val(selectedObj.value);
		 let queryParams ="city="+$("#f_elem_city").val().split(",")[0]+","+$("#f_elem_city").val().split(",")[2].substring(0,1);
		 getWeather(queryParams);
		 return false;
		},
		open: function () {
		 jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 jQuery("#f_elem_city").autocomplete("option", "delay", 100);
	  
	   getLocation();
	
    function getLocation() {
		if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(getCoords);
		
		} else {
			return "";
		  }
	    }
	function getCoords(result) {
		let positionQuery = "lat="+result.coords.latitude+"&lon="+result.coords.longitude;
		 getWeather(positionQuery);
	}

	function getWeather(query){
			$.getJSON("./functions.php?"+query, function(result){
			  console.log(result);
			});
	}
     
});
