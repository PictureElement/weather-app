/*
 * $.ajax()
 * --------
 * Perform an asynchronous HTTP (Ajax) request. The callback will get executed
 * as soon as we get the response back from the server.
 */

function timeConverter(unix_timestamp){
  var a = new Date(unix_timestamp * 1000);
  var time = a.toUTCString();
  return time;
}

function loadData(system) {

    var $location = $('#location');
    var $date = $('#date');
    var $text = $('#text');
    var $temp = $('#temp');
    var $tempScale = $('#tempScale');
    var $humidity = $('#humidity');
    var $pressure = $('#pressure');
    var $wind = $('#wind');
    var $realFeel = $('#realFeel');
    var $visibility = $('#visibility');
    var $uvIndex = $('#uvIndex');
    var $cloudCover = $('#cloudCover');
    var $currentIcon = $('#currentIcon');

    var city = $('#inputCity').val();
    var apiKey = "eOYiiAjNR0EuRaIGNoxAlXQQLn56cQMb"; // accuweather api key
  
    var getCityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiKey + '&q=' + city;

    // Get location key
    $.ajax({
      url: getCityURL,
      method: 'GET'
    }).done(function(result) { // Success
      var locationKey = result[0].Key;

      var getCurrentConditionsURL = 'http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + apiKey + '&details=true';

      // Get current conditions
      $.ajax({
        url: getCurrentConditionsURL,
        method: 'GET'
      }).done(function(result) { // Success
        console.log(result);
        var unix_timestamp = result[0].EpochTime;
        var date = timeConverter(unix_timestamp);
        var text = result[0].WeatherText;
        var humidity = result[0].RelativeHumidity + '%';
        var cloudCover = result[0].CloudCover + '%';
        var uvIndex = result[0].UVIndex + ', ' + result[0].UVIndexText;
        var currentIcon = 'icons/conditions/' + result[0].WeatherIcon + '.svg';

        // Metric
        if (system === 'metric') {
          var temp = Math.round(Number(result[0].Temperature.Metric.Value)).toString();
          var tempScale = '℃';
          var realFeel = Math.round(Number(result[0].RealFeelTemperature.Metric.Value)).toString() + ' ℃';
          var wind = Math.round(Number(result[0].Wind.Speed.Metric.Value)).toString() + ' km/h, ' + result[0].Wind.Direction.Degrees + '°' + ' (' + result[0].Wind.Direction.English + ')';
          var visibility = Math.round(Number(result[0].Visibility.Metric.Value)).toString() + ' km';
          var pressure = result[0].Pressure.Metric.Value + ' mb';
        }
        // Imperial
        else {
          var temp = Math.round(Number(result[0].Temperature.Imperial.Value)).toString();
          var tempScale = '°F';
          var realFeel = Math.round(Number(result[0].RealFeelTemperature.Imperial.Value)).toString() + ' °F';
          var wind = Math.round(Number(result[0].Wind.Speed.Metric.Value)).toString() + ' mph, ' + result[0].Wind.Direction.Degrees + '°' + ' (' + result[0].Wind.Direction.English + ')';
          var visibility = Math.round(Number(result[0].Visibility.Metric.Value)).toString() + ' mi';
          var pressure = result[0].Pressure.Metric.Value + ' in';
        }

        $location.text(city);
        $date.text(date);
        $text.text(text);
        $temp.text(temp);
        $tempScale.text(tempScale);
        $realFeel.text(realFeel);
        $humidity.text(humidity);
        $wind.text(wind);
        $visibility.text(visibility);
        $pressure.text(pressure);
        $cloudCover.text(cloudCover);
        $uvIndex.text(uvIndex);
        $currentIcon.attr("src", currentIcon);

      }).fail(function(err) { // Error handling
        console.log("error");
        throw err;
      });
    }).fail(function(err) { // Error handling
      console.log("error");
      throw err;
    });











    return false;
}

$('form').submit(function(event) {
  event.preventDefault();
  var system = $('input[name="unitSystem"]:checked').val(); // metric or imperial
  loadData(system);
});