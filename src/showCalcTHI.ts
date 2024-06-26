import * as _ from 'lodash';
import { getWeatherInfo } from './getWeatherInfo';
import { countTHIDays } from './countTHIDays';
import { printData2 } from './acquisitions';

declare const window: any;

async function showCalcTHI() {

    let data: any[] = []
    const daysTHI = await getWeatherInfo()
    const values = await countTHIDays();
    for (const[date, obj] of Object.entries(daysTHI)) {
        data.push(obj)
    }

    //Table Stress data
    document.querySelector('#noStress')!.innerHTML = `${values.noStress}`
    document.querySelector('#lightHeat')!.innerHTML = `${values.lightHeat}`
    document.querySelector('#moderateHeat')!.innerHTML = `${values.moderateHeat}`
    document.querySelector('#heavyHeat')!.innerHTML = `${values.heavyHeat}`
    document.querySelector('#severeHeat')!.innerHTML = `${values.severeHeat}`
    document.querySelector('#deadlyHeat')!.innerHTML = `${values.deadlyHeat}`

    //Pagination of sigle days table
    const rowsPerPage = 6;
    let currentPage = 1

    function displayTable(page: number) {
        const table = document.getElementById("daysTable")
        const startIndex = (page - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const slicedData = data.slice(startIndex, endIndex)

        //Clear existing table rows
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Temperature</th>
                <th scope="col">Humidity</th>
                <th scope="col">THI</th>
                </tr>
            </thead>`;
        
        //Add new rows to the table
        slicedData.forEach(item => {
            //@ts-expect-error
            const row = table.insertRow()
            const dateCell = row.insertCell(0)
            const tempCell = row.insertCell(1)
            const humdCell = row.insertCell(2)
            const thiCell = row.insertCell(3)
            dateCell.innerHTML = item.date.split("T")[0]
            tempCell.innerHTML = item.temperature
            humdCell.innerHTML = item.humidity
            thiCell.innerHTML = item.THI
        })

        //Update pagination
        updatePagination(page)
    }

    function updatePagination(currentPage: number) {
        const pageCount = Math.ceil(data.length / rowsPerPage)
        const paginationContainer = document.getElementById("pagination")
        paginationContainer.innerHTML = ""

        for(let i = 1; i <= pageCount;  i++) {
            const pageLink = document.createElement('a')
            pageLink.href = '#'
            pageLink.innerText = `${i}`
            pageLink.onclick = function() {
                displayTable(i)
            }
            if(i === currentPage) {
                pageLink.style.fontWeight = "bold"
            }
            paginationContainer.appendChild(pageLink)
            paginationContainer.appendChild(document.createTextNode(" "))
        }
    }
    displayTable(currentPage);

    printData2();
}
window.showCalcTHI = showCalcTHI;
export{};