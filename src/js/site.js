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

function loadData() {

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
        var temp = result[0].Temperature.Metric.Value;
        var realFeel = result[0].RealFeelTemperature.Metric.Value + ' ℃';
        var humidity = result[0].RelativeHumidity + '%';
        var wind = result[0].Wind.Speed.Metric.Value + ' kph, ' + result[0].Wind.Direction.Degrees + '°' + ' (' + result[0].Wind.Direction.English + ')';
        var visibility = result[0].Visibility.Metric.Value + ' km';
        var pressure = result[0].Pressure.Metric.Value + ' mb';
        var cloudCover = result[0].CloudCover + '%';
        var uvIndex = result[0].UVIndex + ', ' + result[0].UVIndexText;



        $location.text(city);
        $date.text(date);
        $condition.text(condition);
        $temp.text(temp);
        $realFeel.text(realFeel);
        $humidity.text(humidity);
        $wind.text(wind);
        $visibility.text(visibility);
        $pressure.text(pressure);
        $cloudCover.text(cloudCover);
        $uvIndex.text(uvIndex);



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

$('#submitBtn').click(loadData);