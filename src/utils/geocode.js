const request = require("request");
//encodeURIComponent(address) is gonna take the address and turn it to string. if someone enters special chracter that means something in URL structure, we will avoid the errors.

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYWxpYmluIiwiYSI6ImNqeDAwOHB2OTFrdGU0YWxmeTl5emE5czUifQ.OFnS4CYVTRWZ0S2_V6rW4w&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
