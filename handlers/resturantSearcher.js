const path = require("path");
const fs = require("fs");
const missingHandler = require("./missing");
const model = require("../model");

function resturantFetcher(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      data = JSON.parse(data);
      // get all the resturants baseed on the passed location
      // fetch call to the database -> should get us the results, we should be using the model functions
      model
        .getLocationResturants(data)
        .then((matches) => {
          response.end(JSON.stringify(matches));
        })
        .catch((error) => {
          console.error(error);
          missingHandler(request, response);
        });
    }
  });
}
module.exports = resturantFetcher;
