/////////////////////////////////////////////////////////////////////
//                          OUTLINE                                //
/////////////////////////////////////////////////////////////////////
/* 

Tasks:
-[X] get input from user
-[X] set search to local storage
-[X] create getLocalStorage for preload
-[_] list prior searches
-[X] api call for lat/long position
-[X] input lat/long to api call for weather
-[_] update weather divs

Optional:
-[_] update time of day to reflect weather
-[_] animations?

*/
/////////////////////////////////////////////////////////////////////
//                          VARIABLES                              //
/////////////////////////////////////////////////////////////////////

var cityName = $("#city-name");
var submit_button = $("#searcher");

var prior_search_div = $("#prior-search");

var today_div = $("#weather-today");
var five_day_div = $("#five-day");

var excl = "minutely,hourly,alerts";
var units = "metric"
var cityInput, url_geo_reqeust, url_request, weatherData, geo_reqeust_url;

var cityInfo = {
  cityName: "",
  lat: 0,
  lon: 0,
};

/////////////////////////////////////////////////////////////////////
//                          FUNCTIONS                              //
/////////////////////////////////////////////////////////////////////

// storage function

// function for geo position
function getGeo() {
  
  const myKey = "b5160f6261b60ed2e93a3754a8a382bc";

  cityInput = $("#city-name").val().toUpperCase();

  // get lat long
  // http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
  geo_reqeust_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${myKey}`;

  fetch(geo_reqeust_url)
    .then((response) => response.json())

    .then((data) => {
      cityInfo.cityName = cityInput;
      cityInfo.lat = data[0].lat.toFixed(2);

      cityInfo.lon = data[0].lon.toFixed(2);
      url_request = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=${units}&exclude=${excl}&appid=${myKey}`;
    })
    .then(() => {
      setLocal()
    })
    .then(()=>{
      weatherCall()
    })
}

// save to local storage function
function setLocal() {
  var stored_city = JSON.parse(localStorage.getItem("city")) || [];
  stored_city.push(cityInfo);
  localStorage.setItem("city", JSON.stringify(stored_city));
}

// get localStorage function 
function getLocal() {
  var get_local = JSON.parse(localStorage.getItem("city"))
}

// fetching weather data
function weatherCall() {
  fetch(url_request)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    });
}
// function to display data on html
function displayWeather(data) {
  $('#weather-display').removeClass('d-none')

  // today's weather
  $("#today-high-temp").text(`High Temp: ${data.daily[0].temp.max.toFixed(0)} C`);
  $("#today-low-temp").text(`Low Temp: ${data.daily[0].temp.min.toFixed(0)} C`);
  $("#today-feels-like").text(`Feels Like: ${data.daily[0].feels_like.day.toFixed(0)} C`);
  $("#today-pressure").text(`Pressure: ${data.daily[0].pressure.toFixed(0)} hPa`);
  $("#today-humidity").text(`Humidity: ${data.daily[0].humidity.toFixed(0)} %`);
  $('#today-uv').text(`UV: ${data.daily[0].uvi}`)
  uvColor(data.daily[0].uvi)
  $('#today-wind').text(`Wind: ${data.daily[0].wind_speed} m/s`)

  // future weather
  $('#future-one h4').text(getDayFromUnix(data.daily[1].dt))
  $('#future-one p').text(data.daily[1].temp.day.toFixed(0) + " C")

  $('#future-two h4').text(getDayFromUnix(data.daily[2].dt))
  $('#future-two p').text(data.daily[2].temp.day.toFixed(0) + " C")

  $('#future-three h4').text(getDayFromUnix(data.daily[3].dt))
  $('#future-three p').text(data.daily[3].temp.day.toFixed(0) + " C")

  $('#future-four h4').text(getDayFromUnix(data.daily[4].dt))
  $('#future-four p').text(data.daily[4].temp.day.toFixed(0) + " C")

  $('#future-five h4').text(getDayFromUnix(data.daily[5].dt))
  $('#future-five p').text(data.daily[5].temp.day.toFixed(0) + " C")

  // better to just implement a for loop ... I will add that later

}

// Date Converter
function getDayFromUnix(unix) {
  var temp = new Date(unix * 1000)
  var utcString = temp.toUTCString().slice(0,3)
  return utcString
}

// UV Color indicator
function uvColor(inp) {
  if (inp <= 3) {
    $('#today-uv').addClass('bg-info')
  } else if (inp > 3 && inp <= 5) {
    $('#today-uv').addClass('bg-success')
  } else if (inp > 5 && inp <= 8) {
    $('#today-uv').addClass('bg-warning')
  } else if (inp > 8) {
    $('#today-uv').addClass('bg-danger')
  }
}

/////////////////////////////////////////////////////////////////////
//                             MAIN                                //
/////////////////////////////////////////////////////////////////////

function main() {
  submit_button.on("click", () => {
    getGeo();
  });
}
main();
