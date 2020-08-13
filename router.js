const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const missingHandler = require("./handlers/missing");
const autoHandler = require("./handlers/auto");
const resturantFetcher = require("./handlers/resturantSearcher");
const restaurantInfoHandler = require("./handlers/restaurantInfo");
const reviewSubmitter = require("./handlers/reviewSubmitter");
const resdetailsHandler = require("./handlers/resdetails");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else if (url === "/autocomplete" && request.method === "POST") {
    autoHandler(request, response);
  } else if (url === "/search" && request.method === "POST") {
    resturantFetcher(request, response);
    // we need to do respond.end to the data
  } else if (url.indexOf("/resinfo") !== -1 && request.method === "GET") {
    restaurantInfoHandler(request, response);
  } else if (url === "/resinfo" && request.method === "POST") {
    console.log("here");
    resdetailsHandler(request, response);
  } else if (url === "/data" && request.method === "POST") {
    reviewSubmitter(request, response);
  } else {
    missingHandler(request, response);
  }
}

module.exports = router;
