/////////////////////////////////////////////////////////////////////
//                          OUTLINE                                //
/////////////////////////////////////////////////////////////////////
/* 

Tasks:
-[X] get input from user
-[X] set search to local storage
-[_] create getLocalStorage for preload
-[_] list prior searches
-[X] api call for lat/long position
-[_] input lat/long to api call for weather
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
      console.log(4)
      displayWeather(data);
    });
}

function displayWeather(data) {
  // function to display data on html
  $("#today-high-temp").text(`High Temp: ${data.daily[0].temp.max} C`);
  $("#today-low-temp").text(`Low Temp: ${data.daily[0].temp.min} C`);
  $("#today-feels-like").text(`Feels Like: ${data.daily[0].feels_like.day} C`);
  $("#today-pressure").text(`Pressure: ${data.daily[0].pressure} C`);
  $("#today-humidity").text(`Humidity: ${data.daily[0].humidity} C`);
  $('#today-uv').text(`UV: ${data.daily[0].uvi}`)
  $('#today-wind').text(`Wind: ${data.daily[0].wind_speed}`)

}


/////////////////////////////////////////////////////////////////////
//                             MAIN                                //
/////////////////////////////////////////////////////////////////////

function main() {
  submit_button.on("click", () => {
    getGeo();
    // document.getElementById('tester').innerHTML += " doodoo"
  });
}
main();
