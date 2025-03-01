const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, './template/views');
app.set('views', viewsDirectory);

var partialsPath = path.join(__dirname, './template/partials');
hbs.registerPartials(partialsPath);


const port = 3000;

const forecast = require('./tools/forecast');
const geocode = require('./tools/geocode');

app.get('/', (req, res) => {
    res.render('index', {title: "Weather App"});
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter an address"
        });
    };

    geocode(req.query.address, (error, data) => {
        if (error !== undefined) {
            return res.send({
                error: error
            });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error !== undefined) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: req.query.address,
                geomap: `latitude: ${data.latitude}, 
                longitude: ${data.longitude}`, 
                //forecast: forecastData,
                temperature: `${forecastData.temperature}°C ${forecastData.emoji}`,
                feels_like: `Feels like ${forecastData.feels_like}°C ${forecastData.emoji}`,
                condition: forecastData.condition,
                windSpeed: `Wind speed: ${forecastData.windSpeed} km/h`,
                humidity: `Humidity: ${forecastData.humidity}%`
            });
            console.log("Location: ", req.query.address);
            console.log("Forecast: ", forecastData);
        });
    });

});


// app.get('*', (req, res) => {
//     res.send("404 Page Not Found");
// });

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});


