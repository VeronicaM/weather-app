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
		$("#f_elem_city").click(function(event){
			          $(this).val("");
	    });
	    
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
			   
			    let text = result.name+", "+result.sys.country;
		         if(text.indexOf("none")>0) 
		           {
		           	text= text.replace("none","")+ "("+result.coord.lat+", " + result.coord.lon+")";
		          }
		          
			      let data = {
			      	temp: Math.round(result.main.temp),
			      	humidity:Math.round(result.main.humidity),
			      	pressure:Math.round(result.main.pressure),
			      	temp_min:Math.round(result.main.temp_min),
			      	temp_max:Math.round(result.main.temp_max),
			      	description:result.weather[0].description,
			      	imgClass:"wi wi-owm-"+result.weather[0].id,
			      	unitValue:unitValue,
			      	unit:unit,
			      	weatherFor:text
			      }
			      $('body').css("background-image",mapImg(data.description));
			      let template = $("#header").html();
			      let compiledTemplate = Handlebars.compile(template);
			      $("#weatherInfo").html(compiledTemplate(data));
			      $("#toggle").click(function(event){
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
			      $("#f_elem_city").val(data.weatherFor);
			  
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
     function mapImg(description){
     	switch(description){
     		case "clear sky": return "url('public/images/clear sky.jpg')";
     		case "fog":
     		case "mist": return "url('public/images/mist.jpg')";
     		case "snow": return "url('public/images/snow.jpg')";
     		case "broken clouds": return "url('public/images/broken clouds.jpg')";
     		case "scattered clouds": return "url('public/images/scattered clouds.jpg')";
     		case "few clouds": return "url('public/images/few clouds.jpg')";
     		case "rain": return "url('public/images/rain.jpg')";
     		case "shower rain": return "url('public/images/shower rain.jpg')";
     		case "thunderstorm": return "url('public/images/thunderstorm.jpg')";
     		default:
		     		if(description.indexOf("rain") >0){
		     	    	return "url('public/images/rain.jpg')";	 
		     		}else if(description.indexOf("snow") >0){
	     	    	return "url('public/images/snow.jpg')";	 
	     		   }
	     		   else if(description.indexOf("clouds") >0){
	     	    	return "url('public/images/broken clouds.jpg')";	 
	     		   }
	     		   else{
					  return "url('public/images/initial.jpg')";
	     		   }
     		   }		
     	}
     
});
