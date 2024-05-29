import { fetchWeatherApi } from "openmeteo"

let days: dailyTHI[] = []

class dailyTHI  {
    date!: string;
    temperature!: number;
    humidity!: number;
    thi!: number;
}
//Search Longitude and Latitude based on the City's name
const getCityCoordinates = async () => {
    // const getCityNameInput = () => {
    //     return (<HTMLInputElement>document.getElementById('cityName')).value
    // }
    const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${'Colorado'}&count=1&language=en&format=json`
    const res = await fetch(geocodingURL)
    const data = await res.json()

    let coordinates: { lat: number, lon: number } = {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude
    }

    console.log(coordinates)
    return coordinates
}

//Get the Weaather Information of Temperature and Relative Humidity based on Input Information
const getWeatherInfo = async () => {
    const coords = await getCityCoordinates()

    const params = {
        "latitude": coords.lat,
        "longitude": coords.lon,
        "start_date": "2024-05-24",
        "end_date": "2024-05-26",
        "hourly": ["temperature_2m", "relative_humidity_2m"]
    };
    const url = "https://archive-api.open-meteo.com/v1/archive";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    // const timezone = response.timezone();
    // const timezoneAbbreviation = response.timezoneAbbreviation();
    // const latitude = response.latitude();
    // const longitude = response.longitude();

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        // let temp = Math.round(weatherData.hourly.temperature2m[i] * 100) / 100
        // let humd = Math.round(weatherData.hourly.relativeHumidity2m[i] * 100) / 100
        
        // const THI = new dailyTHI()
        // THI.date = weatherData.hourly.time[i].toISOString()
        // THI.temperature = temp
        // THI.humidity = humd
        // THI.thi = Math.round(((0.8*temp) + ((humd/100)*(temp-14.4)) + 46.4) * 100) / 100
        // days.push(THI)
        console.log(
            weatherData.hourly.time[i]
        //     weatherData.hourly.temperature2m[i].toFixed(2),
        //     weatherData.hourly.relativeHumidity2m[i].toFixed(2)
        );
    }

    console.log(days)
}
getWeatherInfo()

export{};