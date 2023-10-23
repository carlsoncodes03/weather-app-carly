function changeCity(city) {
  let units = "imperial";
  let apiKey = "6010503ffcf1560b8aef47f39758b9ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  changeCity(city);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#weather-location").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#main-weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "6010503ffcf1560b8aef47f39758b9ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showLocation(position) {
  console.log(position);
  navigator.geolocation.getCurrentPosition(getPosition);
}

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = days[now.getDay()];
let time = `${hours}:${minutes}`;
let dateAndTime = document.querySelector("#date-and-time");
dateAndTime.innerHTML = `${weekday}, ${time}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

document
  .querySelector("#current-location-btn")
  .addEventListener("click", showLocation);

changeCity("New York");
