  <?php
      function getWeatherString(){
        if(isset($_GET['city'])){
           $response = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=".$_GET['city']."&appid=5a65ddcbbe5bbecec36b72359651372e");  
        }
        else{
            $response = file_get_contents("http://api.openweathermap.org/data/2.5/weather?lat=".$_GET['lat']."&lon=".$_GET['lon']."&appid=5a65ddcbbe5bbecec36b72359651372e");
        }
           $response = json_decode($response);
           return $response;
    }
      echo json_encode(getWeatherString());
    ?>
