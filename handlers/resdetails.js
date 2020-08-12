const missingHandler = require("./missing");
const model = require("../model");

function resdetailsHandler(request, response) {
  let data = "";
  const result = {};

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      response.writeHead(200, { "content-type": "application/json" });
      model.getResturantDetails(data);
      console
        .log(model.getResturantDetails(data))
        .then(function (details) {
          result.details = details;
          return model.getResturantReviews(data);
        })
        .then(function (reviews) {
          result.reviews = reviews;
          respond.end();
        });
    } else {
      missingHandler(request, response);
    }
  });
}

module.exports = resdetailsHandler;
