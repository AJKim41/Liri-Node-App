require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const fs = require("fs");

const concert = userSearch => {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`
    )
    .then(response => {
      // https://momentjs.com/guides/
      let showDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
      let res = `
      ${response.data[0].venue.name}
      ${response.data[0].venue.city}, ${response.data[0].venue.region}
      ${showDate}`;
      console.log(res);
      fs.appendFile("./userSearch", res, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
};

const movie = userSearch => {
  if (userSearch === "") {
    userSearch = "Mr. Nobody";
  }
  axios
    .get(`http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`)
    .then(response => {
      let res = `
      ${response.data.Title}
      ${response.data.Year}
      ${response.data.Rated}
      ${response.data.imdbRating}
      ${response.data.Ratings[1].Value}
      ${response.data.Country}
      ${response.data.Language}
      ${response.data.Plot}
      ${response.data.Actors}`;
      console.log(res);
      fs.appendFile("./userSearch", res, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
};

const spotify = userSearch => {
  // https://www.npmjs.com/package/node-spotify-api
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: `${userSearch}` }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    let res = `
    ${data.tracks.items[0].album.artists[0].name}
    ${data.tracks.items[0].name}
    ${data.tracks.items[0].preview_url}
    ${data.tracks.items[0].album.name}`;
    console.log(res);
    fs.appendFile("./userSearch", res, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

exports.concertThis = concert;
exports.spotifyThisSong = spotify;
exports.movieThis = movie;
