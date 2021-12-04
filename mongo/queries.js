const mongoClient = require("./config");


async function findListing(response, criteria)
{
  // connecting to the database and searching for the 
  // listing that macthes the criteria
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews.findOne(criteria))
    // sending the listing found to the ejs template to show in browser
    .then(listing=>response.render('singleListing', {listing}))
    .catch(error => console.log(error))

}

// multiple listings 
async function findListings (response, criteria, listLimit, projection)
{
  //connecting to the database and searching for all the 
  // listings that macthe the criteria untill the limit of listings is reached
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews
      .find((criteria),{projection})
      .limit(listLimit))
      
  // sending the array of the listings found to the ejs temolate
    .then(cursor=>cursor.toArray())
    .then(summaries=>response.render('summaries', {summaries}))
  .catch(error=>console.log(error))
}


module.exports = {findListing, findListings}  