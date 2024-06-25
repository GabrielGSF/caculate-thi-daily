import * as _ from 'lodash';
declare const window: any;

export async function setCity(lat: string, lon: string, name: string, admin1: string, country: string) {
    let City: {
        latitude: string, 
        longitude: string, 
        name: string, 
        admin1: string, 
        countryName: string
    } = {
        latitude: lat,
        longitude:  lon,
        name: name,
        admin1: admin1,
        countryName: country
    }

    let results = document.querySelectorAll(".result-item");
    if (results.length > 0) {
        document.querySelector(".result-item").remove();
    }

    //City Information
    (<HTMLInputElement>document.getElementById("cityName")).value = City.name + ", " + City.admin1 + ", " + City.countryName;
    document.querySelector('#cityInformation')!.innerHTML = `${City.name} - ${City.admin1} - ${City.countryName}`;
    document.querySelector('#latitude')!.innerHTML = `${City.latitude}`;
    document.querySelector('#longitude')!.innerHTML = `${City.longitude}`;

}
window.setCity = setCity
