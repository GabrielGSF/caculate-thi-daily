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
async function getCityCoordinates() {
    let obj;
    const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${'Colorado'}&count=1&language=en&format=json`;
    const res = await fetch(geocodingURL);
    obj = await res.json();
    console.log(obj);
}
getCityCoordinates();
console.log("oi");
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
let days = [];
class dailyTHI {
    temperature;
    humidity;
    thi;
}
let daysPeriod = 5;
function getTemperature() {
    return Math.floor(Math.random() * (45 - 16));
}
function getHumidity() {
    return Math.floor((Math.random() * (100 - 15)));
}
function calculateTHI(temp, humd) {
    const THI = (1.8 * temp + 32) - ((0.55 - 0.0055 * humd) * (1.8 * temp - 26));
    return THI;
}
for (let i = daysPeriod; i > 0; i--) {
    const t = getTemperature();
    const h = getHumidity();
    const thiResult = calculateTHI(t, h);
    const THI = new dailyTHI();
    THI.temperature = t;
    THI.humidity = h;
    THI.thi = thiResult;
    days.push(THI);
}
export {};
//# sourceMappingURL=app.js.map