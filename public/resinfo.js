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
