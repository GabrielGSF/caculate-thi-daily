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

console.log(days)

export{};