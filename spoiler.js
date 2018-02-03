//PART ONE
const request = require('request')
const cheerio = require('cheerio')

const movie = process.argv[2]
const time = Number(process.argv[3])
const url = `https://www.google.ca/search?q=${movie}`
const inputAPI = `https://api.themoviedb.org/3/search/movie/?api_key=32abd1b72bebf2a07f4490687c38e699&query=${movie}`

function spoilerAlert(movie, time) {
  if (movie !== undefined && time > 0) {
    console.log(`\n***Spoiler Alert*** incoming spoilers for ${movie} the movie in ${time} seconds!\n`)
    scrape(movie, time)
    spoil(movie, time)

  } else if (movie == undefined) {
    console.log("Whoops! You didn't enter a movie!")
    return

  } else if (time < 1) {
    console.log("Whoops! You didn't enter a spoiler time greater than 0!")
    return

  } else {
    console.log("Whoops! You didn't enter a movie or a time greater than 0!")
    return
  }
}

// PART THREE
function scrape(movie, time) {
  request(url, function (error, response, body) {
    if (!error) {
      let $ = cheerio.load(body);

      $("h3").each(function (i, elem) {
        console.log($(this).text());
      })
      console.log(`\n***SPOILER BELOW***\n `)

    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
}

//PART TWO 
function spoil(movie, time) {
  setTimeout(function () {

    //PART FOUR
    request(inputAPI,
      function (err, response, body) {
        const data = JSON.parse(body)
        console.log(data.results[0].overview)
      })
  }, time * 1000)
}

spoilerAlert(movie, time)

