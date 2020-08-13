const db = require("./database/connection");

function getAllRestaurants() {
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

function getRestaurantDetails(restaurantid) {
  return db
    .query(
      `
        SELECT * FROM restaurants 
        WHERE resturants.resturantID LIKE $1
        `,
      [`${input}%`]
    )

    .then((results) => results.row)

    .catch((err) => {
      //do something
    });
}

function getRestaurantReviews(resturantData) {
  return db
    .query(
      `
    SELECT *
    FROM reviews WHERE resturantID = $1 
    `,
      [`${input}%`]
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
  console.log(values);
  return db.query(
    `
    INSERT INTO reviews(restaurant_id, review_author, review) VALUES($1,$2,$3)`,
    values
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
  getAllRestaurants,
  getLocationResturants,
  getRestaurantDetails,
  getRestaurantReviews,
  createNewReview,
  autocomplete,
};
