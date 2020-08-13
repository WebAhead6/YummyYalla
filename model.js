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
  console.log(restaurantid);
  return db
    .query(
      `
        SELECT restaurant_name, rating, menu
         FROM restaurants 
        WHERE id = $1
        `,
      [restaurantid]
    )

    .then((results) => results.rows);
}

function getRestaurantReviews(restaurantid) {
  return db
    .query(
      `
    SELECT *
    FROM reviews WHERE restaurant_id = $1 
    `,
      [restaurantid]
    )
    .then((results) => results.rows);
}

function createNewReview(data) {
  return db.query(
    `
    INSERT INTO reviews(reviewID,author,text,score,resturantID) VALUES($1,$2,$3,$4,$5)
  `,
    [data.reviewID, data.author, data.text, data.score, data.resturantID]
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
