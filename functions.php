  <?php
      function getWeatherString(){
        if(isset($_GET['city'])){
           $countryCode = $response = file_get_contents("http://gd.geobytes.com/GetCityDetails?fqcn=".urlencode($_GET['city']));
           $queryS = json_decode($countryCode,true)['geobytescity'].','.json_decode($countryCode,true)['geobytesinternet'];
            $response = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=".$queryS."&appid=5a65ddcbbe5bbecec36b72359651372e&units=".$_GET['unit']);  
        }
        else{
            $response = file_get_contents("http://api.openweathermap.org/data/2.5/weather?lat=".$_GET['lat']."&lon=".$_GET['lon']."&appid=5a65ddcbbe5bbecec36b72359651372e&units=".$_GET['unit']);
        }
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
