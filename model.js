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
        SELECT *
        FROM restaurants WHERE location_id = $1
        ORDER BY restaurant_name;
        `,
      [`${locationData.id}`]
    )
    .then((resutls) => {
      return resutls.rows;
    })
    .catch((err) => {
      //do something
      console.log(err);
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
  const values = [data.id, data.author, data.review];
  return db.query(
    `
    INSERT INTO reviews(restaurant_id, review_author, review) VALUES($1,$2,$3),values
  `
  );
}

function autocomplete(input) {
  return db
    .query(
      `
    SELECT id,city_name AS name FROM locations
    WHERE city_name LIKE $1
    `,
      [`${input}%`]
    )
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      //do something
      console.log(err);
    });
}
module.exports = {
  getAllResturants,
  getLocationResturants,
  getResturantDetails,
  getResturantReviews,
  createNewReview,
  autocomplete,
};
