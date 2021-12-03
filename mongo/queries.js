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


async function findListings (response, criteria, listLimit)
{
  try{
    var connection = await mongoClient.connect()
    let db = await connection.db('sample_airbnb');
    let listingsAndReviews = await db.collection('listingsAndReviews')
    let cursor = await listingsAndReviews
      .find((criteria),{projection :{_id:0, name:1, description:1 }})
      .limit(listLimit)
    let listings  = await cursor.toArray()
    response.render('listings', {listings})
  }
  catch(error)
  {
    console.log(error)
    response.send(error)
  }
  finally{
    // This is where any cleanup code goes
    connection.close()
  }
}


module.exports = {findListing, findListings}  