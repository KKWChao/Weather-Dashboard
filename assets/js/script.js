/////////////////////////////////////////////////////////////////////
//                          OUTLINE                                //
/////////////////////////////////////////////////////////////////////
/* 

Tasks:
-[_] get input from user
-[_] set search to local storage
-[_] create getLocalStorage for preload
-[_] list prior searches
-[_] api call for lat/long position
-[_] input lat/long to api call for weather
-[_] update weather divs

Optional:
-[_] update time of day to reflect weather
-[_] animations?

*/
/////////////////////////////////////////////////////////////////////
//                          VARIABLES                              //
/////////////////////////////////////////////////////////////////////

var cityName = $('#city-name')
var submit_button = $('#searcher')

var prior_search_div = $('#prior-search')

var today_div = $('#weather-today')
var five_day_div = $('#five-day')

var cityName = ""
var cityInfo
// hourly, daily, ...
var excl = "(3)"

// URL
// var url_request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excl}&appid=b5160f6261b60ed2e93a3754a8a382bc`




function text_to_api() {
  var lat = url_geo_reqeust.lat
  var lon = url_geo_reqeust.lon
  var excl = 'minutely,hourly,alerts'
  cityName = $('#city-name').val()
  
  // get lat long
  // http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key} 
  var url_geo_reqeust = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=b5160f6261b60ed2e93a3754a8a382bc`

  // api call for weather data
  var url_request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excl}&appid=b5160f6261b60ed2e93a3754a8a382bc`
 

  var cityInfo = {'cityName':cityName, 
                  'lat':lat, 
                  'lon':lon, 
                  'url_geo_reqeust':url_geo_reqeust,
                  'url_request':url_request}

  return cityInfo
}

/////////////////////////////////////////////////////////////////////
//                             MAIN                                //
/////////////////////////////////////////////////////////////////////

function main() {


}
main()