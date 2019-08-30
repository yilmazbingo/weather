const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

//set up static directory
app.use(express.static(path.join(__dirname, "../public")));

//config for  handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", name: "yilmaz" });
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help/*", (req, res) => {
  res.render("404", { 404: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { errorMessage: "404 Page Not Found " });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

console.log("yilmaz");
