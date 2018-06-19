/*
 * $.ajax()
 * --------
 * Perform an asynchronous HTTP (Ajax) request. The callback will get executed
 * as soon as we get the response back from the server.
 */

function formatDate(string) {
  var date = new Date(string);
  var formattedDay = date.toString();
  return formattedDay;
}

function getDay(string) {
  var weekday = new Array(7);
  weekday[0]="Sun";
  weekday[1]="Mon";
  weekday[2]="Tue";
  weekday[3]="Wed";
  weekday[4]="Thu";
  weekday[5]="Fri";
  weekday[6]="Sat";
  var date = new Date(string);
  var day = date.getDay();
  return weekday[day];
}

function getTime(string) {
  var date = new Date(string);
  var time = date.getHours();
  if (time < 10) {
    time = '0' + time + ':' + date.getMinutes();
  }
  else {
    time = time + ':' + date.getMinutes();
  }
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
    var $icon = $('#icon');
    var $airQuality = $('#airQuality');
    var $sunrise = $('#sunrise');
    var $sunset = $('#sunset');
    var $moonrise = $('#moonrise');
    var $moonset = $('#moonset');

    var inputCity = $('#inputCity').val();
    var apiKey = "eOYiiAjNR0EuRaIGNoxAlXQQLn56cQMb"; // Accuweather api key
  
    var getLocationURL = 'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiKey + '&q=' + inputCity;

    // Get location key
    $.ajax({
      url: getLocationURL,
      method: 'GET'
    }).done(function(result) { // Success
      
      var locationKey = result[0].Key;
      var location = result[0].EnglishName;
      
      var getCurrentConditionsURL = 'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + apiKey + '&details=true';

      // Get current conditions
      $.ajax({
        url: getCurrentConditionsURL,
        method: 'GET'
      }).done(function(result) { // Success
        console.log(result[0]);
        var date = formatDate(result[0].LocalObservationDateTime);
        var text = result[0].WeatherText;
        var humidity = result[0].RelativeHumidity + '%';
        var cloudCover = result[0].CloudCover + '%';
        var uvIndex = result[0].UVIndex + ', ' + result[0].UVIndexText;
        var icon = 'icons/conditions/' + result[0].WeatherIcon + '.svg';

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

        $location.text(location);
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
        $icon.attr("src", icon);
      }).fail(function(err) { // Error handling
        console.log("error");
        throw err;
      });

      // Metric
      if (system === 'metric') {
        var getForecastMainURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + apiKey + '&details=true' + '&metric=true';
      }
      // Imperial
      else {
        var getForecastURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + apiKey + '&details=true' + '&metric=false';
      }

      // Get main forecast
      $.ajax({
        url: getForecastMainURL,
        method: 'GET'
      }).done(function(result) { // Success
        console.log(result.DailyForecasts);
        
        var airQuality = result.DailyForecasts[0].AirAndPollen[0].Category;
        var sunrise = getTime(result.DailyForecasts[0].Sun.Rise);
        var sunset = getTime(result.DailyForecasts[0].Sun.Set);
        var moonrise = getTime(result.DailyForecasts[0].Moon.Rise);
        var moonset = getTime(result.DailyForecasts[0].Moon.Set);

        $airQuality.text(airQuality);
        $sunrise = text(sunrise);
        $sunset = text(sunset);
        $moonrise = text(moonrise);
        $moonset = text(moonset);

        for (var i = 0; i < 5; i++) {
          var day = getDay(result.DailyForecasts[i].Date);
          console.log(day);
          var icon = 'icons/conditions/' + result.DailyForecasts[i].Day.Icon + '.svg';
          var tempHigh = Math.round(Number(result.DailyForecasts[i].Temperature.Maximum.Value)).toString() + '°';
          var tempLow = Math.round(Number(result.DailyForecasts[i].Temperature.Minimum.Value)).toString() + '°';
          var precipDay = result.DailyForecasts[i].Day.PrecipitationProbability + '%';
          var precipNight = result.DailyForecasts[i].Night.PrecipitationProbability + '%';

          var $day = $('#day-' + i);
          var $icon = $('#icon-' + i);
          var $tempHigh = $('#temp-high-' + i);
          var $tempLow = $('#temp-low-' + i);
          var $precipDay = $('#precip-day-' + i);
          var $precipNight = $('#precip-night-' + i);

          $day.text(day);
          $icon.attr('src', icon);
          $tempHigh.text(tempHigh);
          $tempLow.text(tempLow);
          $precipDay.text(precipDay);
          $precipNight.text(precipNight);
        }
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
  var system = $('input[name="unitSystem"]:checked').val(); // Metric or Imperial
  loadData(system);
});