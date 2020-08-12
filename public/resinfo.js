const resname = document.querySelector(".resname");
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

// fetch ()
// .then()
// .then
