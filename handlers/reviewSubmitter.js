const missingHandler = require("./missing");
const model = require("../model");

function reviewSubmitter(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);
    model
      .createNewReview(data)
      .then(() => {
        response.writeHead(302, { location: "/" });
        response.end();
      })
      .catch((error) => {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`<h1>Something went wrong saving your data</h1>`);
      });
  });
}
module.exports = reviewSubmitter;
