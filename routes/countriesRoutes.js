const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/countriesList', (req, res, next) => {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(listOfCountries => {
    // console.log('-------------- ', Object.keys(listOfCountries))
    console.log("========= ", listOfCountries.data);
    res.render('countriesViews/countriesList', {countries: listOfCountries.data});
  })
  .catch(err => {
    next(err);
  })
})

router.get('/countryDetails/:name', (req, res, next) => {
  axios.get(`https://restcountries.eu/rest/v2/alpha/${req.params.name}`)
  .then(countryDetails => {
    console.log("one contry details >>>>>>> ", countryDetails.data.latlng[0])
    res.render('countriesViews/countryDetail', {oneCountry: countryDetails.data});
  })
  .catch(err => {
    next(err);
  })
})


module.exports = router;
