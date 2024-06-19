import { fetchWeatherApi } from "openmeteo"
import * as _ from 'lodash';

//Autocomplete show results
function showResults(input: string) {
    let res = document.getElementById("result")
    res.innerHTML = ''
    if (input == '') {
        return;
    }
    let list = ''

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`).then(
        function(response) {
            return response.json()
        }).then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                list += `<li
                            class="list-group-item" 
                            onclick="setCity(
                                ${data.results[i].latitude},
                                ${data.results[i].longitude},
                                '${data.results[i].name}',
                                '${data.results[i].admin1}',
                                '${data.results[i].country}'
                            )">
                            ${data.results[i].name}, ${data.results[i].admin1}, ${data.results[i].country}
                        </li>`
            }
            res.innerHTML = '<ul class="result-item list-group">' + list +  '</ul>'
            return true;
        }).catch(function (err) {
            console.warn('Something went wrong.', err)
            return false
        })     
}
window.showResults = showResults

let coordinates: {lat: string, lon: string, name: string, admin1: string, country: string} = {
    lat: '',
    lon:  '',
    name: '',
    admin1: '',
    country: ''
}
function setCity(lat: string, lon: string, name: string, admin1: string, country: string) {
    coordinates.lat = lat;
    coordinates.lon = lon;
    coordinates.name = name;
    coordinates.admin1 = admin1;
    coordinates.country = country;
    document.querySelector(".result-item").remove();

    //City Information
    (<HTMLInputElement>document.getElementById("cityName")).value = coordinates.name + ", " + coordinates.admin1 + ", " + coordinates.country;
    document.querySelector('#cityInformation')!.innerHTML = `${coordinates.name} - ${coordinates.admin1} - ${coordinates.country}`;
    document.querySelector('#cityCoordinates')!.innerHTML = `Latitude: ${coordinates.lat}, Longitude: ${coordinates.lon}`;

}
window.setCity = setCity


//Get the Weaather Information of Temperature and Relative Humidity based on Input Information
const getWeatherInfo = async () => {
    const getStartDate = () => {
        return (<HTMLInputElement>document.getElementById('startDate')).value
    }
    const getEndDate = () => {
        return (<HTMLInputElement>document.getElementById('endDate')).value
    }
    const params = {
        "latitude": coordinates.lat,
        "longitude": coordinates.lon,
        "start_date": getStartDate(),
        "end_date": getEndDate(),
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
    let hoursData = []
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        let temp = Math.round(weatherData.hourly.temperature2m[i] * 100) / 100
        let humd = Math.round(weatherData.hourly.relativeHumidity2m[i] * 100) / 100
        let thi = Math.round(((0.8*temp) + ((humd/100)*(temp-14.4)) + 46.4) * 100) / 100
        
        hoursData.push({
            date: weatherData.hourly.time[i].toISOString(),
            temperature: temp,
            humidity: humd,
            THI: thi
        })
    }

    // console.log(hoursData)
    const groupedByDayWithMaxTHI = hoursData.reduce((daysLog, day) => {
            const date = day.date.split("T")[0]
            // @ts-ignore
            if(!daysLog[date] || day.THI > daysLog[date].THI) {
                // @ts-ignore
                daysLog[date] = day
            }
            return daysLog
        }, [])

    return groupedByDayWithMaxTHI
}


const countTHIDays = async () => {
    const daysThi = await getWeatherInfo()
    const countsStressDays: {
        lightHeat: number, 
        moderateHeat: number,
        heavyHeat: number,
        severeHeat: number,
        deadlyHeat: number,
        noStress: number,
    } = {
        lightHeat: 0,
        moderateHeat: 0,
        heavyHeat: 0,
        severeHeat: 0,
        deadlyHeat: 0,
        noStress: 0,
    }

    for (const [date, obj] of Object.entries(daysThi)) {
        // @ts-ignore
        let thi = obj.THI
        // console.log(thi)
        // console.log(date)
        if(thi > 100) {
            countsStressDays.deadlyHeat += 1
        } else if (thi >= 68.00 && thi < 72.00) {
            countsStressDays.lightHeat += 1
        } else if (thi >= 72.00 && thi < 80.00) {
            countsStressDays.moderateHeat += 1
        } else if (thi >= 80 && thi < 90) {
            countsStressDays.heavyHeat += 1
        } else if (thi >= 90 && thi <= 100) {
            countsStressDays.severeHeat += 1
        } else if (thi < 68) {
            countsStressDays.noStress += 1
        }

        const table = `
            <tr class="table-data">
                <th socope="row">${date}</th>
                <td>${obj.temperature}</td>
                <td>${obj.humidity}</td>
                <td>${obj.THI}</td>
            </tr>
        `
        document.querySelector('#daysData')!.insertAdjacentHTML('beforeend', table)
    }
    return countsStressDays
};

declare const window: any;

async function showCalcTHI() {
    const values = await countTHIDays();

    //Table data
    document.querySelector('#noStress')!.innerHTML = `${values.noStress}`
    document.querySelector('#lightHeat')!.innerHTML = `${values.lightHeat}`
    document.querySelector('#moderateHeat')!.innerHTML = `${values.moderateHeat}`
    document.querySelector('#heavyHeat')!.innerHTML = `${values.heavyHeat}`
    document.querySelector('#severeHeat')!.innerHTML = `${values.severeHeat}`
    document.querySelector('#deadlyHeat')!.innerHTML = `${values.deadlyHeat}`
}
window.showCalcTHI = showCalcTHI;

export{};