const express = require('express');
const router  = express.Router();
const axios   = require('axios');
// const fs      = require('fs');


// fs.writeFile('/javascripts/hidden.js',
// `var theMapApiKey = ${process.env.MAPSAPIKEY}`,
// (err) => {
//   if(err){
//     return console.log("Error creating file! ", err);
//   }
//   console.log("file has been created");
// });

router.get('/countriesList', (req, res, next) => {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(listOfCountries => {
    // console.log('-------------- ', Object.keys(listOfCountries))
    console.log("========= ", listOfCountries.data);
    countryPopArray = [];
    listOfCountries.data.forEach(oneCountry => {
      countryPopArray.push([oneCountry.name, oneCountry.population]);
    });
    data = {
      countries: listOfCountries.data,
      countryPopArray: countryPopArray
    };
    console.log("=====================>>>>>>>>>>>> ", countryPopArray);
    res.render('countriesViews/countriesList', {countries: listOfCountries.data});
  })
  .catch(err => {
    next(err);
  });
});

router.get('/countryDetails/:name', (req, res, next) => {
  axios.get(`https://restcountries.eu/rest/v2/alpha/${req.params.name}`)
  .then(countryDetails => {
    console.log("one contry details >>>>>>> ", countryDetails.data.latlng[0]);
    res.render('countriesViews/countryDetail', {oneCountry: countryDetails.data});
  })
  .catch(err => {
    next(err);
  });
});


module.exports = router;
