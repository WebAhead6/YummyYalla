const form = document.querySelector("#autoform");
const inputField = document.querySelector("#inputField");
const submitBtn = document.querySelector(".formButton");
const results = document.querySelector(".restname");

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
  let resultsContainer = document.querySelector("#results-container");
  resultsContainer.innerText = "";
  const restaurantInfo = document.createElement("ol");
  resultsContainer.appendChild(restaurantInfo);
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
        const li = document.createElement("li");
        li.textContent = `${item.restaurant_name}   rating: ${item.rating}`;
        restaurantInfo.appendChild(li);
        li.addEventListener("click", function getResturantInfo(event) {
          location.replace(`/resinfo?id=${item.id}`);
          event.preventDefault();
        });
      });
    })

    .catch((err) => {
      console.error("Something went wrong during autocompleting : " + err);
    });

  getDeleteBtn().style.display = "block";
  // getDeleteBtn().addEventListener("click", deleteEverything);
});
// a cleaer resutls button, not very useful atm
function getDeleteBtn() {
  return document.querySelector("#delete-btn");
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
/// add event listener to the data(restaurants) retrieved
"restaurantname".addEventListener("click", function getResturantInfo(event) {
  location.replace(`/resinfo?id=${resname}`);
  event.preventDefault();
});
