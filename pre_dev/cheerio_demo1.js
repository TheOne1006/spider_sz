var cheerio = require('cheerio');

var $ = cheerio.load('<h2 class="title">hello world</h2>');

$('h2.title').text('hello there');
$('h2').addClass('wel');

console.log($.html());
// <h2 class="title wel">hello there</h2>
