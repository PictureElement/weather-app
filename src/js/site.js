function loadData() {

    var $location = $('#location');
    var $date = $('#date');
    var $condition = $('#condition');
    var $temp = $('#temp');
    var $tempScale = $('#tempScale');
    var $humidity = $('#humidity');
    var $pressure = $('#pressure');
    var $wind = $('#wind');
    var $visibility = $('#visibility');

    var location = $('#inputLocation').val();
    var units = "c"; // c: metric, f: imperial
    
    var yahooWeatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D%22' + units + '%22%20and%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    // Perform an asynchronous HTTP (Ajax) request. The callback will get 
    // executed as soon as we get the response back from the server 
    $.ajax({
      url: yahooWeatherUrl,
      method: 'GET'
    }).done(function(result) { // Success
      // Root object
      var root = result.query.results.channel;
      console.log(root);
      // Location
      console.log("location: " + root.location.city);
      $location.text(root.location.city);
      // Date
      console.log("date: " + root.item.pubDate);
      $date.text(root.item.pubDate);
      // Condition
      console.log("condition: " + root.item.condition.text);
      $condition.text(root.item.condition.text);
      // Temp
      console.log("temp: " + root.item.condition.temp);
      $temp.text(root.item.condition.temp);
      // Temp scale
      if (units === 'c') {
        $tempScale.text('°C');
      }
      else {
        $tempScale.text('°F');
      }
      // Humidity
      console.log("humidity: " + root.atmosphere.humidity);
      $humidity.text(root.atmosphere.humidity + '%');
      // Pressure
      console.log("pressure: " + root.atmosphere.pressure);
      if (units === 'c') {
        $pressure.text(root.atmosphere.pressure + ' mbar');
      }
      else {
        $pressure.text(root.atmosphere.pressure + ' inHg');
      }
      // Wind
      console.log("wind speed: " + root.wind.speed + ", wind direction: " + root.wind.direction);
      if (units === 'c') {
        $wind.text(root.wind.speed + ' kph ' + root.wind.direction);
      }
      else {
        $wind.text(root.wind.speed + ' mph ' + root.wind.direction);
      }
      // Visibility
      console.log("visibility: " + root.atmosphere.visibility);
      if (units === 'c') {
        $visibility.text(root.atmosphere.visibility + ' km');
      }
      else {
        $visibility.text(root.atmosphere.visibility + ' mi');
      }
    }).fail(function(err) { // Error handling
      console.log("error");
      throw err;
    });

    return false;
}

$('#formContainer').submit(loadData);