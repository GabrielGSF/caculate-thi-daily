//Search Longitude and Latitude based on the City's name
function getCityCoordinates(): void {
    const getCityNameInput = () => {
        return (<HTMLInputElement>document.getElementById('cityName')).value
    }
    const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${getCityNameInput()}&count=1&language=en&format=json`
    fetch(geocodingURL)
    .then((response) => {
        if (!response.ok) {
            throw response
        }
        return response.json()
    })
    .then(data => {

        let cityName: string = data.results[0].name
        let latitude: string = data.results[0].latitude
        let longitude: string = data.results[0].longitude

        const coordinates: {name: string, lat: string, lon: string} = {
            name: cityName,
            lat: latitude,
            lon: longitude
        }

        const name = `<h1>${coordinates.name}</h1>`
        const lat = `<h2>${coordinates.lat}</h2>`
        const lon = `<h2>${coordinates.lon}</h2>`
        document.querySelector('div')!.insertAdjacentHTML("beforeend", name)
        document.querySelector('div')!.insertAdjacentHTML("beforeend", lat)
        document.querySelector('div')!.insertAdjacentHTML("beforeend", lon)

        return console.log(coordinates)
    })
    .catch(error => console.error(error)) 
}

// Lógica
let days: dailyTHI[] = []

class dailyTHI  {
    temperature!: number;
    humidity!: number;
    thi!: number;
}

let daysPeriod = 5

function getTemperature(): number {
    return Math.floor(Math.random() * (45 - 16)) 
}

function getHumidity(): number {
    return Math.floor((Math.random() * (100 - 15)))
}

function calculateTHI(temp: number, humd: number): number {
    const THI = (1.8 * temp + 32) - ((0.55 - 0.0055 * humd) * (1.8 * temp - 26))
    return THI
}

for (let i = daysPeriod; i > 0; i--) {

    const t = getTemperature()
    const h = getHumidity()
    const thiResult = calculateTHI(t, h)
    
    const THI = new dailyTHI()
    THI.temperature = t
    THI.humidity = h
    THI.thi = thiResult

    days.push(THI)
}

// console.log(days)

export{};