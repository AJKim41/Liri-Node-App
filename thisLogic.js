require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const fs = require("fs");

console.log(keys.spotify.id);
console.log(keys.spotify.secret);

const concert = userSearch => {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`
    )
    .then(response => {
      console.log(response.data[0].venue.name);
      console.log(
        `${response.data[0].venue.city}, ${response.data[0].venue.region}`
      );
      // https://momentjs.com/guides/
      console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    });
};

const movie = userSearch => {
  if (userSearch === "") {
    userSearch = "Mr. Nobody";
  }
  axios
    .get(`http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`)
    .then(response => {
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Rated);
      console.log(response.data.imdbRating);
      console.log(response.data.Ratings[1].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
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

    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });
};

exports.concertThis = concert;
exports.spotifyThisSong = spotify;
exports.movieThis = movie;
