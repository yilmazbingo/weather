fetch("http://localhost/weather?adress=boston")
  .catch(e => {
    console.log(e);
  })
  .then(data => {
    console.log(data.location);
    console.log(data.forecast);
  });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`)
    .catch(e => {
      messageTwo.textContent = e.message;
    })
    .then(data => {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
});
