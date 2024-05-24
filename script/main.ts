//Search Longitude and Latitude based on the City's name
const cityName = 'Colorado'
const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
const getCityCoordinates = () => {
    fetch(geocodingURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        data.forEach(coords => {
            const coordinates: {lat: string, lon: string} {
                lat: coords.latitude
            }
        })
    })
    .catch(error => console.error(error)) 
}
getCityCoordinates()






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