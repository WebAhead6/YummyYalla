const missingHandler = require("./missing");
const model = require("../model");

function resdetailsHandler(request, response) {
  console.log("mervat123");
  let data = "";
  const result = {};

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      response.writeHead(200, { "content-type": "application/json" });
      model
        .getRestaurantDetails(data)
        .then(function (details) {
          console.log(details);
          result.details = details;
          return model.getRestaurantReviews(data);
        })
        .then(function (reviews) {
          result.reviews = reviews;
          console.log(reviews);
          response.end(JSON.stringify(result));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      missingHandler(request, response);
    }
  });
}

module.exports = resdetailsHandler;
