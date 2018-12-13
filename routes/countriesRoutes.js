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
    countryPopArray = [['Country', 'Popularity']];
    listOfCountries.data.forEach(oneCountry => {
      // switch(oneCountry.name){
      //   case "Russian Federation":
      //   oneCountry.name = "Russia";
      //   break;
      //   case "United States of America":
      //   oneCountry.name = "United States";
      //   break;
      //   case "Bolivia (Plurinational State of)":
      //   oneCountry.name = "Bolivia";
      //   break;
      //   case "Venezuela (Bolivarian Republic of)":
      //   oneCountry.name = "Venezuela";
      //   break;
      //   case "United Kingdom of Great Britain and Northern Ireland":
      //   oneCountry.name = "United Kingdom";
      //   break;
      //   case "Iran (Islamic Republic of)":
      //   oneCountry.name = "Iran";
      //   break;
      //   case "Viet Nam":
      //   oneCountry.name = "Vietnam";
      //   break;
      //   case "Congo (Democratic Republic of the)":
      //   oneCountry.name = "Democratic Republic of the Congo";
      //   break;
      //   case "Congo":
      //   oneCountry.name = "Republic of Congo";
      //   break;
      //   case "Tanzania, United Republic of":
      //   oneCountry.name = "Tanzania";
      //   break;
      //   case "Korea (Democratic People\'s Republic of)":
      //   oneCountry.name = "North Korea";
      //   break;
      //   case "Korea (Republic of)":
      //   oneCountry.name = "South Korea";
      //   break;
      // }
      countryPopArray.push([{v: oneCountry.alpha2Code,f: oneCountry.name}, oneCountry.population]);
    });
    console.log("----------------- ", res.locals);
    res.locals.countryList = JSON.stringify(countryPopArray);
    console.log(">>>>>>>>>>>>>>>>>> ", res.locals);
    // console.log("=====================>>>>>>>>>>>> ", countryPopArray);
    res.render('countriesViews/countriesList', {countries: listOfCountries.data});
  })
  .catch(err => {
    next(err);
  });
});

router.get('/countryDetails/:name', (req, res, next) => {
  axios.get(`https://restcountries.eu/rest/v2/alpha/${req.params.name}`)
  .then(countryDetails => {
    countryPopArray = [['Country', 'Popularity']];
    countryPopArray.push([countryDetails.data.alpha2Code, countryDetails.data.population]);
    res.locals.countryList = JSON.stringify(countryPopArray);
    // console.log("one contry details >>>>>>> ", countryDetails.data.latlng[0]);
    res.render('countriesViews/countryDetail', {oneCountry: countryDetails.data});
  })
  .catch(err => {
    next(err);
  });
});


module.exports = router;
