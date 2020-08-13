const missingHandler = require("./missing");
const model = require("../model");

function reviewSubmitter(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const data = JSON.parse(body);
    model
      .createNewReview(data)
      .then(() => {
        console.log(data);
        response.writeHead(200);
        response.end(JSON.stringify("success"));
      })
      .catch((error) => {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`<h1>Something went wrong saving your data</h1>`);
      });
  });
}
module.exports = reviewSubmitter;
