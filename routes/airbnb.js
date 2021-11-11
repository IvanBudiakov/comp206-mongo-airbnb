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
  let criteria = {bedrooms:{$gte:3}, 
  number_of_reviews:{$gte:5},
  "address.country_code":"US",
  //amenities : {$in : ['WiFi', 'Coffee Maker']}
};

  mongoQueries.findListing(res, criteria);
})



router.get("/list", (req,res)=>{
  let criteria = {}
  mongoQueries.findListing(res, criteria)
})

module.exports = router;
