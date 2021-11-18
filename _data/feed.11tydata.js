let RSSParser = require('rss-parser');
let parser = new RSSParser();


module.exports = (async () => {

    let feed = await parser.parseURL('https://vintagecitychurch.com/category/teachings/feed');
    return feed
  
  })();




