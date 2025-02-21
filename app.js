const forecast = require('./data_handling/forecast');
const geocode = require('./data_handling/geocode');

//console.log(process.argv)

const country = process.argv[2];

geocode(country, (error, data) => {
    console.log("ERROR : ", error);
    console.log("DATA : ", data);

    forecast(data.latitude, data.longtitude, (error, data) => {
        console.log("ERROR : ", error);
        console.log("DATA : ", data);
    });
});

// peocess.argv vs yargs
/*
    yargs is a pain in the ass rn

*/