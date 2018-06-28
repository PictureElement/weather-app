function formatDate(string) {
  var date = new Date(string);
  var formattedDay = date.toString();
  return formattedDay;
}

function getDay(string) {
  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
  var date = new Date(string);
  var day = date.getDay();
  return weekday[day];
}

function getTime(string) {
  var date = new Date(string);
  var hours = date.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var time = hours + ':' + minutes;
  return time;
}

function getMoonPhaseClass(age) {
  var phase = new Array(28);
  phase[0] = "wi-moon-new";
  phase[1] = "wi-moon-waxing-crescent-1";
  phase[2] = "wi-moon-waxing-crescent-2";
  phase[3] = "wi-moon-waxing-crescent-3";
  phase[4] = "wi-moon-waxing-crescent-4";
  phase[5] = "wi-moon-waxing-crescent-5";
  phase[6] = "wi-moon-waxing-crescent-6";
  phase[7] = "wi-moon-first-quarter";
  phase[8] = "wi-moon-waxing-gibbous-1";
  phase[9] = "wi-moon-waxing-gibbous-2";
  phase[10] = "wi-moon-waxing-gibbous-3";
  phase[11] = "wi-moon-waxing-gibbous-4";
  phase[12] = "wi-moon-waxing-gibbous-5";
  phase[13] = "wi-moon-waxing-gibbous-6";
  phase[14] = "wi-moon-full";
  phase[15] = "wi-moon-waning-gibbous-1";
  phase[16] = "wi-moon-waning-gibbous-2";
  phase[17] = "wi-moon-waning-gibbous-3";
  phase[18] = "wi-moon-waning-gibbous-4";
  phase[19] = "wi-moon-waning-gibbous-5";
  phase[20] = "wi-moon-waning-gibbous-6";
  phase[21] = "wi-moon-third-quarter";
  phase[22] = "wi-moon-waning-crescent-1";
  phase[23] = "wi-moon-waning-crescent-2";
  phase[24] = "wi-moon-waning-crescent-3";
  phase[25] = "wi-moon-waning-crescent-4";
  phase[26] = "wi-moon-waning-crescent-5";
  phase[27] = "wi-moon-waning-crescent-6";
  return phase[age-1];
}

function getBeaufort(windSpeed, system) {
  if (system === 'metric') {
    if (windSpeed < 1) {
      return '0';
    }
    else if (windSpeed <= 5) {
      return '1';
    }
    else if (windSpeed <= 11) {
      return '2';
    }
    else if (windSpeed <= 19) {
      return '3';
    }
    else if (windSpeed <= 28) {
      return '4';
    }
    else if (windSpeed <= 38) {
      return '5';
    }
    else if (windSpeed <= 49) {
      return '6';
    }
    else if (windSpeed <= 61) {
      return '7';
    }
    else if (windSpeed <= 74) {
      return '8';
    }
    else if (windSpeed <= 88) {
      return '9';
    }
    else if (windSpeed <= 102) {
      return '10';
    }
    else if (windSpeed <= 117) {
      return '11';
    }
    else {
      return '12';
    }
  }
  else {
    if (windSpeed < 1) {
      return '0';
    }
    else if (windSpeed <= 3) {
      return '1';
    }
    else if (windSpeed <= 7) {
      return '2';
    }
    else if (windSpeed <= 12) {
      return '3';
    }
    else if (windSpeed <= 18) {
      return '4';
    }
    else if (windSpeed <= 24) {
      return '5';
    }
    else if (windSpeed <= 31) {
      return '6';
    }
    else if (windSpeed <= 38) {
      return '7';
    }
    else if (windSpeed <= 46) {
      return '8';
    }
    else if (windSpeed <= 54) {
      return '9';
    }
    else if (windSpeed <= 63) {
      return '10';
    }
    else if (windSpeed <= 72) {
      return '11';
    }
    else {
      return '12';
    }
  }
}

function loadData(system) {

    // CURRENT CONDITIONS
    var $location = $('#location');
    var $date = $('#date');
    var $text = $('#text');
    var $temp = $('#temp');
    var $tempScale = $('#tempScale');
    var $icon = $('#icon');
    var $realFeel = $('#realFeel');
    var $uvIndex = $('#uvIndex');
    var $airQuality = $('#airQuality');

    // DETAILS
    var $humidity = $('#humidity');
    var $pressure = $('#pressure');
    var $windSpeed = $('#windSpeed');
    var $windDirection = $('#windDirection');
    var $visibility = $('#visibility');
    var $cloudCover = $('#cloudCover');
    var $sunrise = $('#sunrise');
    var $sunset = $('#sunset');
    var $moonrise = $('#moonrise');
    var $moonset = $('#moonset');
    var $moonPhase = $('#moonPhase');
    var $beaufort = $('#beaufort');
    var $background = $('#background');
    
    var inputCity = $('#inputCity').val();
    //var accuweatherApiKey = "eOYiiAjNR0EuRaIGNoxAlXQQLn56cQMb"; // Accuweather api key
    var accuweatherApiKey = "KrnJm3pGAtha40EFim82KLEqvaikzMeS"; // Accuweather api key
    var flickrApiKey = "8df7b25e698caeac3e6711c1c46140b1"; // Flickr api key

  
    var locationResourceURL = 'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + accuweatherApiKey + '&q=' + inputCity;

    // Get location key (Accuweather Location API)
    $.ajax({
      url: locationResourceURL,
      method: 'GET'
    }).done(function(result) { // Success
      
      var locationKey = result[0].Key; // Location key
      var location = result[0].EnglishName; // City name

      var placeIDsResourceURL = 'https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=' + flickrApiKey + '&query=' + location + '&format=json&nojsoncallback=1';

      // Get a list of place IDs (Flickr API: flickr.places.find)
      $.ajax({
        url: placeIDsResourceURL,
        method: 'GET'
      }).done(function(result) { // Success
        
        var placeId = result.places.place[0].place_id; // Place id
        
        var photosResourceURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrApiKey + '&tags=city&content_type=1&place_id=' + placeId + '&format=json&nojsoncallback=1';

        // Get a list of photos (Flickr API: flickr.photos.search)
        $.ajax({
          url: photosResourceURL,
          method: 'GET'
        }).done(function(result) { // Success
          
          var photoId = result.photos.photo[0].id;

          var photoSizesResourceURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + flickrApiKey + '&photo_id=' + photoId + '&format=json&nojsoncallback=1';

          // Get the available sizes for a photo (Flickr API: flickr.photos.getSizes)
          $.ajax({
            url: photoSizesResourceURL,
            method: 'GET'
          }).done(function(result) {

            var len = result.sizes['size'].length;
            var photoURL = result.sizes['size'][len - 2].source;

            $background.attr("src", photoURL); // Set background image
            
          }).fail(function(err) { // Error handling
            console.log("error");
            throw err;
          });

        }).fail(function(err) { // Error handling
          console.log("error");
          throw err;
        });

      }).fail(function(err) { // Error handling
        console.log("error");
        throw err;
      });
      
      var currentConditionsResourceURL = 'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + accuweatherApiKey + '&details=true';

      // Get current conditions (Accuweather Current Conditions API)
      $.ajax({
        url: currentConditionsResourceURL,
        method: 'GET'
      }).done(function(result) { // Success
        
        var date = formatDate(result[0].LocalObservationDateTime);
        var text = result[0].WeatherText;
        var temp;
        var tempScale;
        var icon = 'icons/conditions/' + result[0].WeatherIcon + '.svg';
        var realFeel;
        var uvIndex = result[0].UVIndex + ', ' + result[0].UVIndexText;
        var humidity = result[0].RelativeHumidity + '%';
        var pressure;
        var windSpeed;
        var beaufort;
        var windDirection;
        var visibility;
        var cloudCover = result[0].CloudCover + '%';
       
        // Metric
        if (system === 'metric') {
          temp = Math.round(result[0].Temperature.Metric.Value).toString();
          tempScale = '℃';
          realFeel = Math.round(result[0].RealFeelTemperature.Metric.Value).toString() + ' ℃';
          pressure = Math.round(result[0].Pressure.Metric.Value).toString() + ' mb';
          windSpeed = Math.round(result[0].Wind.Speed.Metric.Value).toString() + ' km/h';
          beaufort = getBeaufort(Math.round(result[0].Wind.Speed.Metric.Value), system) + ' B';
          windDirection = result[0].Wind.Direction.Degrees + '°' + ' (' + result[0].Wind.Direction.English + ')';
          visibility = Math.round(result[0].Visibility.Metric.Value).toString() + ' km';
        }
        // Imperial
        else {
          temp = Math.round(result[0].Temperature.Imperial.Value).toString();
          tempScale = '°F';
          realFeel = Math.round(result[0].RealFeelTemperature.Imperial.Value).toString() + ' °F';
          pressure = Math.round(result[0].Pressure.Imperial.Value).toString() + ' inHg';
          windSpeed = Math.round(result[0].Wind.Speed.Imperial.Value).toString() + ' mph';
          beaufort = getBeaufort(Math.round(result[0].Wind.Speed.Imperial.Value), system) + ' B';
          windDirection = result[0].Wind.Direction.Degrees + '°' + ' (' + result[0].Wind.Direction.English + ')';
          visibility = Math.round(result[0].Visibility.Imperial.Value).toString() + ' mi';
        }

        $location.text(location);
        $date.text(date);
        $text.text(text);
        $temp.text(temp);
        $tempScale.text(tempScale);
        $icon.attr("src", icon);
        $realFeel.text(realFeel);
        $uvIndex.text(uvIndex);
        $humidity.text(humidity);
        $pressure.text(pressure);
        $windSpeed.text(windSpeed);
        $beaufort.text(beaufort);
        $windDirection.text(windDirection);
        $visibility.text(visibility);
        $cloudCover.text(cloudCover);
        
      }).fail(function(err) { // Error handling
        console.log("error");
        throw err;
      });

      var forecastResourceURL;
      var hourlyForecastResourseURL;

      // Metric
      if (system === 'metric') {
        forecastResourceURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + accuweatherApiKey + '&details=true' + '&metric=true';
        hourlyForecastResourseURL = 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + locationKey + '?apikey=' + accuweatherApiKey + '&metric=true';
      }
      // Imperial
      else {
        forecastResourceURL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + accuweatherApiKey + '&details=true' + '&metric=false';
        hourlyForecastResourseURL = 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + locationKey + '?apikey=' + accuweatherApiKey + '&metric=true';
      }

      // Get hourly forecast (Accuweather Forecast API)
      $.ajax({
        url: hourlyForecastResourseURL,
        method: 'GET'
      }).done(function(result) { // Success

        for (var i = 0; i < 12; i++) {
          var time = getTime(result[i].DateTime);
          var hourlyIcon = 'icons/conditions/' + result[i].WeatherIcon + '.svg';
          var hourlyTemp = Math.round(result[i].Temperature.Value).toString() + '°';

          var $time = $('#time-' + i);
          var $hourlyIcon = $('#hourly-icon-' + i);
          var $hourlyTemp = $('#hourly-temp-' + i);

          $time.text(time);
          $hourlyIcon.attr('src', hourlyIcon);
          $hourlyTemp.text(hourlyTemp);
        }

      }).fail(function(err) { // Error handling
        console.log("error");
        throw err;
      });

      // Get main forecast (Accuweather Forecast API)
      $.ajax({
        url: forecastResourceURL,
        method: 'GET'
      }).done(function(result) { // Success
        
        var airQuality = result.DailyForecasts[0].AirAndPollen[0].Category;
        var sunrise = getTime(result.DailyForecasts[0].Sun.Rise);
        var sunset = getTime(result.DailyForecasts[0].Sun.Set);
        var moonrise = getTime(result.DailyForecasts[0].Moon.Rise);
        var moonset = getTime(result.DailyForecasts[0].Moon.Set);
        var moonPhase = '<i class="wi ' + getMoonPhaseClass(result.DailyForecasts[0].Moon.Age) + '"></i>' + result.DailyForecasts[0].Moon.Phase.replace(/([A-Z])/g, ' $1');
        
        $airQuality.text(airQuality);
        $sunrise.text(sunrise);
        $sunset.text(sunset);
        $moonrise.text(moonrise);
        $moonset.text(moonset);
        $moonPhase.empty();
        $moonPhase.append(moonPhase);

        for (var i = 0; i < 5; i++) {
          var day = getDay(result.DailyForecasts[i].Date);
          var icon = 'icons/conditions/' + result.DailyForecasts[i].Day.Icon + '.svg';
          var tempHigh = Math.round(result.DailyForecasts[i].Temperature.Maximum.Value).toString() + '°';
          var tempLow = Math.round(result.DailyForecasts[i].Temperature.Minimum.Value).toString() + '°';
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