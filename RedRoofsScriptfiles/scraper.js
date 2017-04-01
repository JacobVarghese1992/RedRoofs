var scraperjs = require('scraperjs');
console.log("yay");
scraperjs.DynamicScraper.create('http://www.greenzang.com/rental_listings/')
    .scrape(function($) {
    	console.log("yay");
        return $(".listing-item__title a")[5].text
    })
    .then(function(news) {
        console.log(news);
    })