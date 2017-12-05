var Spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require("fs");
var keys = require('./keys.js');

var nodeArgs = process.argv;

var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {

	if (i > 3 && i < nodeArgs.length) {
		userInput = userInput + "+" + nodeArgs[i];
	} else {
		userInput += nodeArgs[i];
	}
}

 if (process.argv[2] === "my-tweets") {
 	myTweets();
 }
if (process.argv[2] === "spotify-this-song") {
	spotifyThis(userInput);
}
if (process.argv[2] === "movie-this") {
 	movieThis(userInput);
}
if (process.argv[2] === "do-what-it-says") {
	readRandom();
}



// node liri.js my-tweets
// shows last 20 tweets and when they were created at in terminal
//==============================================================
//THIS CODE WORKS - DO NOT EDIT UNTIL READY TO PUT INTO FUNCTION!
//==============================================================
//==============================================================
function myTweets() {
	var client = new twitter(keys);

	var params = {
		screen_name: 'jgarcia_gomez'
	};

	client.get('statuses/user_timeline', params, function(err, data, response) {
	  if(!err){
	  	for (i = 0; i < data.length; i++) {
	  	console.log("@jgarcia_gomez: " + data[i].text + " Date: " + data[i].created_at.substring(0, 19));
	  	console.log("--------------------------------------------------");
			}

	  } else {
	    console.log(err);
	  }
	});
};
//==============================================================
//==============================================================


// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
//==============================================================
//==============================================================
//Client ID f01dcd447bd24adf9b1d5d1a7e2f6cce
//Client Secret a1044eeb836b4c48a9d88d3fb2a714a6
//==============================================================
//==============================================================


//==============================================================
//THIS CODE WORKS - DO NOT EDIT UNTIL READY TO PUT INTO FUNCTION!
//==============================================================
function spotifyThis(song) {
	var spotify = new Spotify({
		id: 'f01dcd447bd24adf9b1d5d1a7e2f6cce',
		secret: 'a1044eeb836b4c48a9d88d3fb2a714a6'
	});
	spotify.search({ type: 'track', query: song }, function(err, data) {
	if (!err) {
		for (i = 0; i < data.tracks.items.length; i++) {
		var songs = data.tracks.items[i];

	    console.log("Artist(s): " + songs.artists[0].name);
	    console.log("Song: " + songs.name);
	    console.log("Preview link: " + songs.preview_url);
	    console.log("Album: " + songs.album.name);
	    console.log("--------------------------------------------------");
		}

	} else {
		console.log(err);
		}
	});
}
//==============================================================
//THIS CODE WORKS - DO NOT EDIT UNTIL READY TO PUT INTO FUNCTION!
//==============================================================


// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
//==============================================================
//==============================================================
function movieThis(movie) {

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    //I HAVE TO FIGURE OUT HOW TO GET ROTTEN TOMATOES RATING
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Source);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

// do-what-it-says
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
//==============================================================
//==============================================================
function readRandom() {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {

			return console.log(error);
		}
			dataArr = data.split(",");

			spotifyThis(dataArr[1]);
	});

};



