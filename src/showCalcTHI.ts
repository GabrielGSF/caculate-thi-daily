import * as _ from 'lodash';
import { countTHIDays } from './countTHIDays';
import { chartTHI } from './chartTHI';
import { chartPrecipitation } from './chartPrecipitation';
import { thiTable } from './thiTable';
import { precipitationTable } from './precipitationTable';
import Chart from 'chart.js/auto'


declare const window: any;

const dataPrecipitation = [
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
];
let graphareaPrecipitation =  document.getElementById('chartPrecipitation') as HTMLCanvasElement;
let chartPrecipitationBase = new Chart(
    graphareaPrecipitation,
    {
      type: 'line',
      data: {
        labels: dataPrecipitation.map(row => row.month),
        datasets: [
          {
            label: 'Precipitation',
            data: dataPrecipitation.map(row => row.averagePrecipitation)
          }
        ]
      }
    }
);

const dataTHI = [
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
    { month: 0, averagePrecipitation: 0 },
];
let graphareaTHI =  document.getElementById('chartTHI') as HTMLCanvasElement;
let chartTHIBase = new Chart(
    graphareaTHI,
    {
      type: 'line',
      data: {
        labels: dataTHI.map(row => row.month),
        datasets: [
          {
            label: 'THI',
            data: dataTHI.map(row => row.averagePrecipitation)
          }
        ]
      }
    }
);

async function showCalcTHI() {

    const values = await countTHIDays();

    //Table Stress data
    document.querySelector('#noStress')!.innerHTML = `${values.noStress}`
    document.querySelector('#lightHeat')!.innerHTML = `${values.lightHeat}`
    document.querySelector('#moderateHeat')!.innerHTML = `${values.moderateHeat}`
    document.querySelector('#heavyHeat')!.innerHTML = `${values.heavyHeat}`
    document.querySelector('#severeHeat')!.innerHTML = `${values.severeHeat}`
    document.querySelector('#deadlyHeat')!.innerHTML = `${values.deadlyHeat}`

    thiTable();
    chartTHI();

    precipitationTable();
    chartPrecipitation();

}
window.showCalcTHI = showCalcTHI;
export{};