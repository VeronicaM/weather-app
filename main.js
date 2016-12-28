jQuery(function () 
 {
 	let map ,
 	    query = "",
 	    unitValue ="C", 
 	    unit = "metric";
			      
	 jQuery("#f_elem_city").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"./functions.php?autocomplete=true&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#f_elem_city").val(selectedObj.value);
         query ="city="+$("#f_elem_city").val();
   		 getWeather(query);	
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
	  $(document).ready(function(){
		getLocation();
		
	  });
	   
    function getLocation() {
		if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(getCoords);
		
		} else {
			return "";
		  }
	    }
	function getCoords(result) {
		 query = "lat="+result.coords.latitude+"&lon="+result.coords.longitude;
		 getWeather(query);
	}

	function getWeather(query){
			$.getJSON("./functions.php?unit="+unit+"&"+query, function(result){
			    
			      let data = {
			      	temp: result.main.temp,
			      	humidity:result.main.humidity,
			      	pressure:result.main.pressure,
			      	temp_min:result.main.temp_min,
			      	temp_max:result.main.temp_max,
			      	description:result.weather[0].description,
			      	img:"http://openweathermap.org/img/w/"+result.weather[0].icon+".png",
			      	unitValue:unitValue,
			      	unit:unit,
			      	weatherFor:result.name+", "+result.sys.country
			      }
			      let template = $("#header").html();
			      let compiledTemplate = Handlebars.compile(template);
			      $("#weatherInfo").html(compiledTemplate(data));
			      $("#toggle").click(function(event){
			         console.log("here");
			          unit = unit == "imperial" ? "metric": "imperial";
			          unitValue = unitValue == "C" ? "F" : "C";
			          getWeather(query);
				  });
			      let location ={
			      	coords:{
			      		latitude:result.coord.lat,
			      		longitude:result.coord.lon
			      	}
			      }
			      initMap(location,data.weatherFor);
			});
	}
	
 
      function initMap(location,title) {
      	let ll ={lat: location.coords.latitude, lng: location.coords.longitude};
         setMap(ll,title);
         map.addListener('dblclick', function(e) { 
			   query = "lat="+e.latLng.lat()+"&lon="+e.latLng.lng();
			   getWeather(query);
		 }); 
      }
     
     function setMap(ll,title){
     	 
         map = new google.maps.Map(document.getElementById('map'), {
           center: ll,
           zoom: 8
         });
         let marker = new google.maps.Marker({
           position: ll,
           map: map,
           title: title
         });
     }
});
