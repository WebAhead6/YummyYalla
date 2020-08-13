const form = document.querySelector("#autoform");
const inputField = document.querySelector("#inputField");
const submitBtn = document.querySelector(".formButton");
const results = document.querySelector(".restname");
let resultsContainer = document.querySelector("#results-container");

let dataRes = {};
// Add a keyup event listener to our input element

let id;

inputField.addEventListener("keyup", (event) => {
  dataRes = {};
  // console.log(event.target);
  autocompleter(event);
  console.log(dataRes);
});
// form submiter - calls a function that will connect with the server and fetch the resturants data based on the locations
form.addEventListener("submit", (event) => {
  resultsContainer.innerText = "";
 
  event.preventDefault();
  console.log(inputField.value);
  //fetch function should be started here <------------
  fetch("/search", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.map((item) => {
        // build the card element - the layout of the results
        cardBuilder(item);
      });
    })
    .catch((err) => {
      console.error("Something went wrong during autocompleting : " + err);
    });
});

function cardBuilder(obj) {
  resultsContainer.innerHTML += `
      <div  class="card">
      <img src="${obj.imgurl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${obj.restaurant_name}</h5>
        <p class="card-text">Resturant Rating ${obj.rating}</p>
        <button onclick="redierct(${obj.id})" class="btn btn-primary meals resBtn">Go to resturant</button>
      </div>
      </div>
  `;
}
function redierct(id) {
  location.replace(`/resinfo?id=${id}`);
}

// Autocomplete for form
function autocompleter(event) {
  // retireve the input element
  const input = event.target;
  // retrieve the datalist element
  const listo = document.querySelector("#listo");

  // minimum number of characters before we start to generate suggestions
  const min_characters = 0;

  if (input.value.length < min_characters) {
    return;
  } else {
    fetch("/autocomplete", {
      method: "POST", // we want to send the server a data, and apply some logic to it
      headers: {
        "Content-Type": "application/json",
      },
      body: input.value,
    })
      .then((response) => {
        if (response.ok) {
          // we should be getting a strignified json, convert it to json agfain and pass it on
          return response.json();
        }
      })
      .then((response) => {
        // clear any previously loaded options in the datalist
        listo.innerHTML = "";
        response.forEach((element) => {
          // Create a new <option> element.
          let option = document.createElement("option");
          // option.value = element.id;
          id = element.id;
          option.textContent = element.name;

          // attach the option to the datalist element
          listo.appendChild(option);
        });
      })
      .catch((err) => {
        console.error("Something went wrong during autocompleting : " + err);
      });
  }
}
