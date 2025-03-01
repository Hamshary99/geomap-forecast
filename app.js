const forecast = require('./data_handling/forecast');
const geocode = require('./data_handling/geocode');

//console.log(process.argv)

const country = process.argv[2];

geocode(country, (error, data) => {
    if(error !== undefined) {
    console.log("ERROR: ", error);
    } else {
    //console.log("DATA : ", data);
    console.log("Country: ", country);
    console.log("Longtitude: ", data.longtitude);
    console.log("Latitude: ", data.latitude);
    }

    forecast(data.latitude, data.longtitude, (error, data) => {
        if(error !== undefined) {
        console.log("ERROR: ", error);
        } else {
        console.log("DATA: ", data);
        }
    });
});

// peocess.argv vs yargs
/*
    yargs is a pain in the ass rn

*/