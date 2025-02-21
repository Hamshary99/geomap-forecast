const axios = require('axios');

const geocode = (address, callback) => {

const geocodeUrl = "https://api.mapbox.com/search/geocode/v6/forward?q="+address+"&proximity=ip&access_token=pk.eyJ1IjoibW85OXh4IiwiYSI6ImNtN2VxczlyYzBhNTAyanNlaWxlZHp0azIifQ.1H0_aPJ06FBAikeFpZt-tQ"

axios.get(geocodeUrl)
.then(function (response) {
    const features = response.data.features;
    const longtitude = features[0].properties.coordinates.longitude;
    const latitude = features[0].properties.coordinates.latitude;

    callback(undefined, {longtitude: longtitude, latitude: latitude});

    })
    .catch(function (error) {
        //console.log(error);
        //handle error
        if (error.response) {
            if (error.response.status === 400) {
                //console.log("unable to find location ❓📍");
                callback("unable to find location ❓📍", undefined);
            } else if (error.response.status === 401) {
                //console.log("Token is invalid or unavailable 🔑❌");
                callback("Token is invalid or unavailable 🔑❌", undefined);
            }

        } else {
            //console.log('Unable to access the site 🌐❌');
            callback('Unable to access the site 🌐❌', undefined);
        }
    })
    .finally(function () {
        // always executed
    });

};


module.exports = geocode;
