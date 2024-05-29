"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// let coordinates: {name: string, lat: number, lon: number} = {
//     name: "",
//     lat: 0,
//     lon: 0
// }
// //Search Longitude and Latitude based on the City's name
// const getCityCoordinates = async () => {
//     const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${'Colorado'}&count=1&language=en&format=json`
//     const coords = await fetch(geocodingURL)
//             // .then((response) => {
//             //     if (!response.ok) {
//             //         throw response
//             //     }
//             //     return response.json()
//             // })
//             .then(res => res.json())
//             .then(data => {
//             })
//             .catch(error => console.error(error)) 
// }
function getCityCoordinates() {
    return __awaiter(this, void 0, void 0, function () {
        var obj, geocodingURL, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    geocodingURL = "https://geocoding-api.open-meteo.com/v1/search?name=".concat('Colorado', "&count=1&language=en&format=json");
                    return [4 /*yield*/, fetch(geocodingURL)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    obj = _a.sent();
                    return [2 /*return*/, obj];
            }
        });
    });
}
var coords = await getCityCoordinates();
console.log(coords);
// const params = {
// 	"latitude": 52.52,
// 	"longitude": 13.41,
// 	"start_date": "2024-05-06",
// 	"end_date": "2024-05-20",
// 	"hourly": "temperature_2m"
// };
// const url = "https://archive-api.open-meteo.com/v1/archive";
// const responses = await fetchWeatherApi(url, params);
// // Helper function to form time ranges
// const range = (start: number, stop: number, step: number) =>
// 	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
// // Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];
// // Attributes for timezone and location
// const utcOffsetSeconds = response.utcOffsetSeconds();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const latitude = response.latitude();
// const longitude = response.longitude();
// const hourly = response.hourly()!;
// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	hourly: {
// 		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
// 			(t) => new Date((t + utcOffsetSeconds) * 1000)
// 		),
// 		temperature2m: hourly.variables(0)!.valuesArray()!,
// 	},
// };
// // `weatherData` now contains a simple structure with arrays for datetime and weather data
// for (let i = 0; i < weatherData.hourly.time.length; i++) {
// 	console.log(
// 		weatherData.hourly.time[i].toISOString(),
// 		weatherData.hourly.temperature2m[i]
// 	);
// }
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
