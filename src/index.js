// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// write your code here

/*
function askCity(){
  let city = prompt('Enter a city');
  city = city.trim();

   if(weather[city]!== undefined){
        let curCity = city.replace(/^[^a-zа-яё]*([a-zа-яё])/i, function(m){
                return m.toUpperCase();
            }); 
        
        let celsiusTemp = Math.round(weather[city].temp);
        let fahrenTemp = Math.round((weather[city].temp*1.8000)+32.00);
        
        let curHumidity = weather[city].humidity ;
        alert(`It is currently ${celsiusTemp} °C  (${fahrenTemp}°F)  in ${curCity} with a humidity of ${curHumidity} %`)
    }
    else if(city.length<=0){
      alert('Pleace, enter a city!');
      askCity();
    }
    else{
        let link =  `https://www.google.com/search?q=weather+${city}`;
        alert(`Sorry, we don't know the weather for this city, try going to ${link} `);
        //window.location.href = `https://www.google.com/search?q=weather+${city}`;
    };
}
askCity();
*/

const celsiusLink = document.querySelector('#celsius');
const farenLink = document.querySelector('#fareng');
const searchBtn = document.querySelector(".input-city");
const currentBtn = document.querySelector(".btn-warning");

 window.addEventListener("load", showCurrentLocation);
 displayForecast();

function showWeather(response) {

 console.log(response.data.dt*1000)

 let city = document.querySelector("#city");
 city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
 
  console.log(response)
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let weather = document.querySelector('#weather');
  weather.innerHTML = response.data.weather[0].description;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
  let icon = document.querySelector("#current-img");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let celsiusTemp = currentTemp.innerHTML;
  celsiusLink.addEventListener("click", function (event) {
    event.preventDefault();
    currentTemp.innerHTML = `${celsiusTemp}`;
  });
  farenLink.addEventListener("click", function (event) {
    event.preventDefault();
    celsiusTemp = Number(celsiusTemp);
    let fahrenTemp = Math.round(celsiusTemp * 1.8 + 32.0);
    currentTemp.innerHTML = `${fahrenTemp}`;
  });

  
}
  //  let currentCityInput = document.querySelector("#exampleDataList");
  //  currentCityInput.innerHTML="";
  //  console.log(currentCityInput);
// function showTemp(response) {
//   console.log(response);
//   let temp = document.querySelector("#current-temp");
//   temp.innerHTML = Math.round(response.data.main.temp);
// }

function getCity(event){
  event.preventDefault();
  let currentCityInput = document.querySelector("#exampleDataList").value;
  let apiKey = "6876f80c7fdc4d4f6b847b1ddd6523b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
};

function handlePosition(position) {
  
  let apiKey = "6876f80c7fdc4d4f6b847b1ddd6523b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);  
};

function showCurrentLocation () {
  navigator.geolocation.getCurrentPosition(handlePosition);
};

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
  ];
  let forecastHTML =`<div class="row">`  ;
  days.forEach(function(day){
    forecastHTML =
      forecastHTML +
            `<div class="col-3 cards-container">
              <h4>${day}</h4>
              <span><small>06.10</small></span><br>
              <img src="images/sunclouds.png" alt="" width="50px" /><br>
              <span >desc</span> <br>
              <span><strong>21°С</strong></span>
              <span><small>14°С</small></span>
            </div>`;
    
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

searchBtn.addEventListener("submit", getCity);
currentBtn.addEventListener("click",showCurrentLocation) 

const currentDayP = document.querySelector("#day");
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


