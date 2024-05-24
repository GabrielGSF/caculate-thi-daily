"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
console.log(days);
