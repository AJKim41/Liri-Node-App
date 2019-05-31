const doThis = require("./thisLogic.js");
const fs = require("fs");
let userCommand = process.argv.slice(2, 3).join("");
let userSearch = process.argv.slice(3).join(" ");

const doWhatItSays = () => {
  fs.readFile("./random.txt", function(err, data) {
    let fileContent = data.toString();

    userCommand = fileContent
      .split(" ")
      .slice(0, 1)
      .join("");
    userSearch = fileContent
      .split(" ")
      .slice(1)
      .join(" ");
    liri();
  });
};

const liri = () => {
  switch (userCommand) {
    case "concert-this":
      doThis.concertThis(userSearch);
      break;
    case "spotify-this-song":
      doThis.spotifyThisSong(userSearch);
      break;
    case "movie-this":
      doThis.movieThis(userSearch);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      break;
  }
};

liri();
