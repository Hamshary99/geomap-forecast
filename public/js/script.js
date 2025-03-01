

let form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(document.getElementById('address').value);
    weatherFunction();
    form.reset();
});

const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const resultsContainer = document.getElementById('forecast-results');


// const humidityF = document.getElementById('humidity');
// const temperatureF = document.getElementById('temperature');
// const windSpeedF = document.getElementById('wind');
const geomapF = document.getElementById('geomap');

let weatherFunction = async () => {
    try {
        const address = document.getElementById('address').value;
        const res = await fetch('http://localhost:3000/weather?address='+address);
        const data = await res.json();
        console.log(data);
        if(data.error) {
            errorF.innerText = data.error;
            locationF.innerText = '';
            //forecastF.innerText = '';
            geomapF.innerText = '';
            resultsContainer.innerText = '';
        } else {
           // let ul = document.createElement('ul');
            locationF.innerText = data.location;
            geomapF.innerText = data.geomap;
            //forecastF.innerText = data.forecast;
            resultsContainer.innerHTML = `
                Temperature: ${data.temperature}<br>
                Feels like: ${data.feels_like}<br>
                Condition: ${data.condition}<br>
                Wind Speed: ${data.windSpeed}<br>
                Humidity: ${data.humidity}<br>
            `;
            errorF.innerText = '';
        }
    }
    catch (error) {
        console.log(error);
    }
}