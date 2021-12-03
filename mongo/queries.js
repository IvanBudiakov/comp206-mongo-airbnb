const mongoClient = require("./config");


async function findListing(response, criteria)
{
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews.findOne(criteria))
    .then(listing=>response.render('singleListing', {listing}))
    .catch(error => console.log(error))

    
}


async function findListings (response, criteria, listLimit, projection)
{
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews
      .find((criteria),{projection})
      .limit(listLimit))
    .then(cursor=>cursor.toArray())
    .then(summaries=>response.render('summaries', {summaries}))
  .catch(error=>console.log(error))
}


module.exports = {findListing, findListings}  