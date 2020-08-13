// const model = require("../model");

const resname = document.querySelector(".resname");
const menu = document.querySelector(".menu");
const rating = document.querySelector(".rating");
const reviews = document.querySelector(".reviews");
const resid = location.search.split("=")[1];

const result = {};
fetch("/resinfo", {
  method: "POST",
  body: resid,
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.details[0].restaurant_name);
    resname.textContent = data.details[0].restaurant_name;
    menu.textContent = data.details[0].menu;
    rating.textContent = data.details[0].rating;
    reviews.textContent = data.reviews[0].review;
  });
const reviewForm = document.querySelector("#review-form");
const authorName = document.querySelector(".author");
const review = document.querySelector(".review");
console.log(location.search.split("=")[1]);

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("/data", {
    method: "POST", // we want to send the server a data, and apply some logic to it
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: location.search.split("=")[1],
      author: authorName.value,
      review: review.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      if (response === "success") {
        location.replace("/");
      }
    })
    .catch((err) => {
      console.error("Something went wrong during autocompleting : " + err);
    });
});
