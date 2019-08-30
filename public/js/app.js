const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(data => {
      console.log("yilmaz");
      console.log((messageTwo.textContent = data.forecast));
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    })
    .catch(e => {
      console.log(e);
      messageTwo.textContent = e.message;
    });
});
