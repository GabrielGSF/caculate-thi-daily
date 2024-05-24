"use strict";
// Objeto dayTHI {
//         
// }
Object.defineProperty(exports, "__esModule", { value: true });
let days = [];
let daysPeriod = 5;
function getTemperature() {
    return Math.floor(Math.random() * (45 - 16));
}
function getHumidity() {
    return Math.floor((Math.random() * (100 - 15)));
}
for (let i = daysPeriod; i > 0; i--) {
    console.log("Temperatura: " + getTemperature());
    console.log("Humidade: " + getHumidity());
}
