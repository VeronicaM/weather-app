  <?php
      function getWeatherString(){
      
        if(isset($_GET['city'])){
           $cityInfo = file_get_contents("http://gd.geobytes.com/GetCityDetails?fqcn=".urlencode($_GET['city']));
           $lat = json_decode($cityInfo,true)['geobyteslatitude'];
           $lon = json_decode($cityInfo,true)['geobyteslongitude'];
            
        } 
        else{
            $lat = $_GET['lat'];
            $lon = $_GET['lon'];
        }   
            $response = file_get_contents("http://api.openweathermap.org/data/2.5/weather?lat=".$lat."&lon=".$lon."&appid=5a65ddcbbe5bbecec36b72359651372e&units=".$_GET['unit']);
    
           $response = json_decode($response);
           return $response;
    }
    function getAutocomplete(){
         $response = file_get_contents("http://gd.geobytes.com/AutoCompleteCity?q=".$_GET['q']);
           return $response;
    }
    if(isset($_GET['autocomplete'])){
      echo getAutocomplete();
    }
    else {
      echo json_encode(getWeatherString());  
     } 
?>
