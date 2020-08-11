const db = require("./database/connection");

function getAllResturants() {
  return db.query("SELECT * FROM resturants").then((results) => {
    return results.rows;
  });
}

function getLocationResturants(locationData) {
  return db
    .query(
      `
        SELECT resturants.name, resturants.desc , resturants.rating
        FROM resturants INNER JOIN locations
        ON resturants.locationID = $1
        ORDER BY resturants.name;
        `,
      [locationData.locationID]
    )
    .then((resutls) => results.row)
    .catch((err) => {
      //do something
    });
}

function getResturantDetails(resturantData) {
  return db
    .query(
      `
        SELECT * FROM resturants
        WHERE resturants.resturantID = $1
        `,
      [resturantData.resturantID]
    )
    .then((results) => results.row)
    .catch((err) => {
      //do something
    });
}

function getResturantReviews(resturantData) {
  return db
    .query(
      `
    SELECT *
    FROM reviews WHERE resturantID = $1 
    `,
      [resturantData.resturantID]
    )
    .then((results) => {
      results.rows;
    })
    .catch((err) => {
      //do something with the error
    });
}

function createNewReview(data) {
  return db.query(
    `
    INSERT INTO reviews(reviewID,author,text,score,resturantID) VALUES($1,$2,$3,$4,$5)
  `,
    [data.reviewID, data.author, data.text, data.score, data.resturantID]
  );
}

module.exports = {
  getAllResturants,
  getLocationResturants,
  getResturantDetails,
  getResturantReviews,
  createNewReview,
};