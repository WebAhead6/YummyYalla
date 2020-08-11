const path = require("path");
const fs = require("fs");
const db = require("../data/db.json");
const missingHandler = require("./missing");
const model = require("../model");

function autoHandler(request, response) {
  let data = "";

  request.on("data", (chunk) => {
    data += chunk;
  });

  request.on("end", () => {
    if (data) {
      response.writeHead(200, {"content-type": "application/json"});
      model.autocomplete(data).then((matches) => {
        response.end(JSON.stringify(matches));
      });
    } else {
      missingHandler(request, response);
    }
  });
}

module.exports = autoHandler;
