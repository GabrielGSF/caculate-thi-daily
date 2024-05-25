//Search Longitude and Latitude based on the City's name
function getCityCoordinates() {
    const getCityNameInput = () => {
        return document.getElementById('cityName').value;
    };
    const request = new Request(`https://geocoding-api.open-meteo.com/v1/search?name=${getCityNameInput()}&count=1&language=en&format=json`);
    fetch(request, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // mode: 'no-cors'
    })
        .then((response) => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
        .then(data => {
        let cityName = data.results[0].name;
        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;
        const coordinates = {
            name: cityName,
            lat: latitude,
            lon: longitude
        };
        const markup = `<h1>${coordinates.name}</li>`;
        document.querySelector('div').insertAdjacentHTML("beforeend", markup);
        return console.log(coordinates);
    })
        .catch(error => console.error(error));
}
let days = [];
class dailyTHI {
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
