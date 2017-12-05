// Global Variables
//==============================================================

var Spotify = require('node-spotify-api');
var twitter = require('twitter');
var request = require('request');
var fs = require("fs");
var keys = require('./keys.js');
var nodeArgs = process.argv;
var userInput = "";

// Takes in user input and initializes functions
//==============================================================

for (var i = 3; i < nodeArgs.length; i++) {
	if (i > 3 && i < nodeArgs.length) {
		userInput = userInput + "+" + nodeArgs[i];
	} else {
		userInput += nodeArgs[i];
	}
}

if (nodeArgs[2] === "my-tweets") {
 	myTweets();
}

if (nodeArgs[2] === "spotify-this-song" && nodeArgs[3]) {
	spotifyThis(userInput);
	} else if (nodeArgs[2] === "spotify-this-song") {
		spotifyThis("The Sign Ace of Base");
}

if (nodeArgs[2] === "movie-this" && nodeArgs[3]) {
 	movieThis(userInput);
	} else if (process.argv[2] === "movie-this") {
		movieThis("Mr Nobody");
}

if (nodeArgs[2] === "do-what-it-says") {
	readRandom();
}

// node liri.js my-tweets
//==============================================================

function myTweets() {
	var client = new twitter(keys);

	var params = {
		screen_name: 'jgarcia_gomez'
	};

	client.get('statuses/user_timeline', params, function(err, data, response) {
		if(!err){
		  	for (i = 0; i < data.length; i++) {
		  	console.log("--------------------------------------------------");
		  	console.log("@jgarcia_gomez: " + data[i].text + " Date: " + data[i].created_at.substring(0, 19));
		  	console.log("--------------------------------------------------");
				}
			} else {
		    console.log(err);
		}
	});
};

// node liri.js spotify-this-song '<song name here>'
//==============================================================
function spotifyThis(song) {
	var spotify = new Spotify({
		id: 'f01dcd447bd24adf9b1d5d1a7e2f6cce',
		secret: 'a1044eeb836b4c48a9d88d3fb2a714a6'
	});
	spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
	if (!err) {
	for (i = 0; i < data.tracks.items.length; i++) {
		var songs = data.tracks.items[i];
	
		console.log("--------------------------------------------------");
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

// node liri.js movie-this '<movie name here>'
//==============================================================
function movieThis(movie) {

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log("--------------------------------------------------");
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    console.log("--------------------------------------------------");
		}

		if (movie === "Mr Nobody") {
			console.log("--------------------------------------------------")
			console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
			console.log("It's on Netflix!")
			console.log("--------------------------------------------------")
		}
	});
};

// do-what-it-says
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

