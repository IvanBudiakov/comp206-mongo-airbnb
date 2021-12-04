var express = require('express');
var mongoClient = require('./../mongo/config')
var mongoQueries = require('./../mongo/queries')
var router = express.Router();


// localhost:3000/airbnb
router.get('/', (req, res) => {
  res.render('airbnb', {title:'AirBnb', mongoHost:mongoClient.options.srvHost});
});

/* GET users listing. 
  localhost:3000/airbnb/send
*/


router.get('/send', (req,res)=>{
  
  let criteria = {
    bedrooms:{$gte: parseInt(req.query.bedrooms)},
    minimum_nights: req.query.nights,
    "address.country_code" : req.query.countryCode
};
  mongoQueries.findListing(res, criteria);
})



router.get("/list", (req,res)=>{
  let criteria = {
    bedrooms:{$gte: parseInt(req.query.bedrooms)},
    "address.country" : req.query.countryList
  }
  let limitList = parseInt(req.query.numListings)
  mongoQueries.findListings(res, criteria, limitList)
})

router.get("/listing" , (req,res) => {
  let criteria = {
    _id : req.query.sumID
    
  }
  console.log(req.query.sumID)
  mongoQueries.findListing(res, criteria)
})

module.exports = router;
