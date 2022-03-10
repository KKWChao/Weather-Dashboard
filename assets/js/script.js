/////////////////////////////////////////////////////////////////////
//                          OUTLINE                                //
/////////////////////////////////////////////////////////////////////
/* 

Tasks:
-[X] get input from user
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

var excl = 'minutely,hourly,alerts'

var cityName, lat, lon, url_geo_reqeust, url_request, cityInfo

/////////////////////////////////////////////////////////////////////
//                          FUNCTIONS                              //
/////////////////////////////////////////////////////////////////////


function text_to_api() {
  cityName = $('#city-name').val().toUpperCase()


  // get lat long
  // http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key} 
  var geo_reqeust_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=b5160f6261b60ed2e93a3754a8a382bc`

  fetch(geo_reqeust_url) 
    .then(function(response) {
      var lat = response.lat
      var lon = response.lon
      console.log(lat, lon, response)
      return [response.json(), lat, lon];
    })
    
  

  // api call for weather data
  // var url_request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excl}&appid=${secretKey}`
  // var url_request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excl}&appid=b5160f6261b60ed2e93a3754a8a382bc`
 
  // Saving search to local storage
  
  var stored_city = JSON.parse(localStorage.getItem('city')) || [];
  stored_city.push({'cityName':cityName})
  
  localStorage.setItem('city', JSON.stringify(stored_city))


  cityInfo = {'cityName':cityName, 
              'lat':lat, 
              'lon':lon, 
              'geo_reqeust_url':geo_reqeust_url}

  return cityInfo
}



// fetch requests
/* 
fetch(text_to_api().url_geo_request) (
  .then(response => {

  })
)

*/

function loadPriorSearch() {

}



/////////////////////////////////////////////////////////////////////
//                             MAIN                                //
/////////////////////////////////////////////////////////////////////

function main() {
  submit_button.on('click', () => {
    console.log("clicked")
    text_to_api()
    console.log($('#city-name').val())
  })

}
main()