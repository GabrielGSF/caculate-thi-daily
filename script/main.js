"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Search Longitude and Latitude based on the City's name
function getCityCoordinates() {
    var getCityNameInput = function () {
        return document.getElementById('cityName').value;
    };
    var geocodingURL = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(getCityNameInput(), "&count=1&language=en&format=json");
    fetch(geocodingURL)
        .then(function (response) {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
        .then(function (data) {
        var cityName = data.results[0].name;
        var latitude = data.results[0].latitude;
        var longitude = data.results[0].longitude;
        var coordinates = {
            name: cityName,
            lat: latitude,
            lon: longitude
        };
        var name = "<h1>".concat(coordinates.name, "</h1>");
        var lat = "<h2>".concat(coordinates.lat, "</h2>");
        var lon = "<h2>".concat(coordinates.lon, "</h2>");
        document.querySelector('div').insertAdjacentHTML("beforeend", name);
        document.querySelector('div').insertAdjacentHTML("beforeend", lat);
        document.querySelector('div').insertAdjacentHTML("beforeend", lon);
        return console.log(coordinates);
    })
        .catch(function (error) { return console.error(error); });
}
// Lógica
var days = [];
var dailyTHI = /** @class */ (function () {
    function dailyTHI() {
    }
    return dailyTHI;
}());
var daysPeriod = 5;
function getTemperature() {
    return Math.floor(Math.random() * (45 - 16));
}
function getHumidity() {
    return Math.floor((Math.random() * (100 - 15)));
}
function calculateTHI(temp, humd) {
    var THI = (1.8 * temp + 32) - ((0.55 - 0.0055 * humd) * (1.8 * temp - 26));
    return THI;
}
for (var i = daysPeriod; i > 0; i--) {
    var t = getTemperature();
    var h = getHumidity();
    var thiResult = calculateTHI(t, h);
    var THI = new dailyTHI();
    THI.temperature = t;
    THI.humidity = h;
    THI.thi = thiResult;
    days.push(THI);
}
