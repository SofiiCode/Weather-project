
const celsiusLink = document.querySelector("#celsius");
const farenLink = document.querySelector("#fareng");
const searchBtn = document.querySelector("#search");
const currentBtn = document.querySelector("#current");
const currentDayP = document.querySelector("#day");
const form = document.querySelector("form");

// window.addEventListener("load", getCity);

function currentDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${currentDay} ${hour}:${minutes}`;
}

currentDayP.innerHTML = currentDate();

function formatDay(timestamp){
  let date = new Date(timestamp * 1000)
  let day = date.getDay();
   let days = [
     "Sun",
     "Mon",
     "Tue",
     "Wed",
     "Thu",
     "Fri",
     "Sat",
   ];
return days[day]
};

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if(index <6){
       forecastHTML =
         forecastHTML +
         `<div class="col-2 cards-container">
              <h4>${formatDay(forecastDay.dt)}</h4>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="50px" /><br>
              <span >${forecastDay.weather[0].main}</span> <br>
              <span><strong>${Math.round(
                forecastDay.temp.max
              )}°С</strong></span>
              <span><small>${Math.round(forecastDay.temp.min)}°С</small></span>
            </div>`;
    }
   
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(cordinates) {
  console.log(cordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#current-img");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function getCity(event) {
  event.preventDefault();
  let currentCityInput = document.querySelector("#input").value;
  let apiKey = "6876f80c7fdc4d4f6b847b1ddd6523b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityInput}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}


function handlePosition(position) {
  let apiKey = "6876f80c7fdc4d4f6b847b1ddd6523b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

// getCity()
// searchBtn.addEventListener("submit", getCity);
form.addEventListener("submit", getCity);
currentBtn.addEventListener("click", showCurrentLocation);
showCurrentLocation();


