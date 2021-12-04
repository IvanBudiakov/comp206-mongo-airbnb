var express = require('express');
var mongoClient = require('./../mongo/config')
var mongoQueries = require('./../mongo/queries')
var router = express.Router();


// localhost:3000/airbnb
router.get('/', (req, res) => {
  res.render('airbnb', {title:'AirBnb', mongoHost:mongoClient.options.srvHost});
});

router.get('/send', (req,res)=>{
    // setting up the criteria of choosing the right listings from database
  let criteria = {
    bedrooms:{$gte: parseInt(req.query.bedrooms)},
    minimum_nights: req.query.nights,
    "address.country_code" : req.query.countryCode
};
  // sending the criteria to the function that searches by criteria 
  mongoQueries.findListing(res, criteria);
})



router.get("/list", (req,res)=>{
  
    // setting up the criteria of choosing the right listings from database
  let criteria = {
    bedrooms:{$gte: parseInt(req.query.bedrooms)},
    "address.country" : req.query.countryList
  }
    // the maximum amount of listings showed
  let limitList = parseInt(req.query.numListings)
  mongoQueries.findListings(res, criteria, limitList)
})

// display listing by id 
router.get("/listing" , (req,res) => {
  let criteria = {
    _id : req.query.sumID
  }
  console.log(req.query.sumID)
  mongoQueries.findListing(res, criteria)
})

module.exports = router;
