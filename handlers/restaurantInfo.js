const fs = require("fs");
const path = require("path");
const missingHandler = require("./missing");

function restaurantInfoHandler(request, response) {
  const filepath = path.join(__dirname, "../public/", "resinfo.html");
  console.log(filepath);
  fs.readFile(filepath, (error, file) => {
    if (error) {
      missingHandler(request, response);
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
}

module.exports = restaurantInfoHandler;
