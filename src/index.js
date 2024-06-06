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
var openmeteo_1 = require("openmeteo");
//Search Longitude and Latitude based on the City's name
var getCityCoordinates = function () { return __awaiter(void 0, void 0, void 0, function () {
    var getCityNameInput, geocodingURL, res, data, coordinates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getCityNameInput = function () {
                    return document.getElementById('cityName').value;
                };
                geocodingURL = "https://geocoding-api.open-meteo.com/v1/search?name=".concat(getCityCoordinates(), "&count=1&language=en&format=json");
                return [4 /*yield*/, fetch(geocodingURL)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                coordinates = {
                    lat: data.results[0].latitude,
                    lon: data.results[0].longitude
                };
                return [2 /*return*/, coordinates];
        }
    });
}); };
//Get the Weaather Information of Temperature and Relative Humidity based on Input Information
var getWeatherInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var coords, getStartDate, getEndDate, params, url, responses, range, response, utcOffsetSeconds, hourly, weatherData, hoursData, i, temp, humd, thi, groupedByDayWithMaxTHI;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCityCoordinates()];
            case 1:
                coords = _a.sent();
                getStartDate = function () {
                    return document.getElementById('startDate').value;
                };
                getEndDate = function () {
                    return document.getElementById('endDate').value;
                };
                params = {
                    "latitude": coords.lat,
                    "longitude": coords.lon,
                    "start_date": getStartDate(),
                    "end_date": getEndDate(),
                    "hourly": ["temperature_2m", "relative_humidity_2m"]
                };
                url = "https://archive-api.open-meteo.com/v1/archive";
                return [4 /*yield*/, (0, openmeteo_1.fetchWeatherApi)(url, params)];
            case 2:
                responses = _a.sent();
                range = function (start, stop, step) {
                    return Array.from({ length: (stop - start) / step }, function (_, i) { return start + i * step; });
                };
                response = responses[0];
                utcOffsetSeconds = response.utcOffsetSeconds();
                hourly = response.hourly();
                weatherData = {
                    hourly: {
                        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(function (t) { return new Date((t + utcOffsetSeconds) * 1000); }),
                        temperature2m: hourly.variables(0).valuesArray(),
                        relativeHumidity2m: hourly.variables(1).valuesArray(),
                    },
                };
                hoursData = [];
                for (i = 0; i < weatherData.hourly.time.length; i++) {
                    temp = Math.round(weatherData.hourly.temperature2m[i] * 100) / 100;
                    humd = Math.round(weatherData.hourly.relativeHumidity2m[i] * 100) / 100;
                    thi = Math.round(((0.8 * temp) + ((humd / 100) * (temp - 14.4)) + 46.4) * 100) / 100;
                    hoursData.push({
                        date: weatherData.hourly.time[i].toISOString(),
                        temperature: temp,
                        humidity: humd,
                        THI: thi
                    });
                }
                groupedByDayWithMaxTHI = hoursData.reduce(function (daysLog, day) {
                    var date = day.date.split("T")[0];
                    // @ts-ignore
                    if (!daysLog[date] || day.THI > daysLog[date].THI) {
                        // @ts-ignore
                        daysLog[date] = day;
                    }
                    return daysLog;
                }, []);
                return [2 /*return*/, groupedByDayWithMaxTHI];
        }
    });
}); };
var countTHIDays = function () { return __awaiter(void 0, void 0, void 0, function () {
    var daysThi, countsStressDays, _i, _a, _b, date, obj, thi;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getWeatherInfo()];
            case 1:
                daysThi = _c.sent();
                countsStressDays = {
                    lightHeat: 0,
                    moderateHeat: 0,
                    heavyHeat: 0,
                    severeHeat: 0,
                    deadlyHeat: 0,
                    noStress: 0,
                };
                for (_i = 0, _a = Object.entries(daysThi); _i < _a.length; _i++) {
                    _b = _a[_i], date = _b[0], obj = _b[1];
                    thi = obj.THI;
                    console.log(thi);
                    console.log(date);
                    if (thi > 100) {
                        countsStressDays.deadlyHeat += 1;
                    }
                    else if (thi >= 68.00 && thi < 72.00) {
                        countsStressDays.lightHeat += 1;
                    }
                    else if (thi >= 72.00 && thi < 80.00) {
                        countsStressDays.moderateHeat += 1;
                    }
                    else if (thi >= 80 && thi < 90) {
                        countsStressDays.heavyHeat += 1;
                    }
                    else if (thi >= 90 && thi <= 100) {
                        countsStressDays.severeHeat += 1;
                    }
                    else if (thi < 68) {
                        countsStressDays.noStress += 1;
                    }
                }
                return [2 /*return*/, countsStressDays];
        }
    });
}); };
function showCalcTHI() {
    return __awaiter(this, void 0, void 0, function () {
        var values, noStrs, ltHt, mdHt, hvHt, svrHt, ddlyHt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, countTHIDays()];
                case 1:
                    values = _a.sent();
                    noStrs = "".concat(values.noStress);
                    ltHt = "".concat(values.lightHeat);
                    mdHt = "".concat(values.moderateHeat);
                    hvHt = "".concat(values.heavyHeat);
                    svrHt = "".concat(values.severeHeat);
                    ddlyHt = "".concat(values.deadlyHeat);
                    document.querySelector('#noStress').insertAdjacentHTML("afterbegin", noStrs);
                    document.querySelector('#lightHeat').insertAdjacentHTML("afterbegin", ltHt);
                    document.querySelector('#moderateHeat').insertAdjacentHTML("afterbegin", mdHt);
                    document.querySelector('#heavyHeat').insertAdjacentHTML("afterbegin", hvHt);
                    document.querySelector('#severeHeat').insertAdjacentHTML("afterbegin", svrHt);
                    document.querySelector('#deadlyHeat').insertAdjacentHTML("afterbegin", ddlyHt);
                    return [2 /*return*/];
            }
        });
    });
}
