let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: ['speakerList','seriesList']
  }
});


module.exports = (async () => {
let seriesArray = [];
let uniqueSeriesArray = [];

let feed = await parser.parseURL('https://podcast.live.wiredacorn.com/feed/rssFeed');
console.log(feed.items[2])

if (feed.items.length > 0) {
  console.log("Items Found")
  if ("seriesList" in feed.items[0]) {
    //console.log(feed.items[0].seriesList)
    //console.log("Found Category Field")
    
    for (let item in feed.items) {
      for (let seriesNumber in feed.items[item].seriesList) {
        seriesArray.push(...feed.items[item].seriesList[seriesNumber]);
      }
      
    }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    // uniqueSeriesArray = [...new Set(feed.items.flatMap(({series}) => series))].sort()
    uniqueSeriesArray = seriesArray.filter(onlyUnique)
  } else {
    console.log("Did not find seriesList field.")
  }
} else {
  console.log("No items in RSS feed.")
}

//console.log("categoriesArray")
//console.log(seriesArray)
//console.log("uniqueSeriesArray")
//console.log(uniqueSeriesArray)

return {
  'feed': feed,
  'seriesList': uniqueSeriesArray
}

})();


