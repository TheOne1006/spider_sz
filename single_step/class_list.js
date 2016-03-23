var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');


debug('读取微博文章类别');

request('http://blog.sina.com.cn/u/1776757314', function (err, res, body) {
  if(err) {
    console.error(err);
  }

  var $ = cheerio.load(body);

  // 文章类别列表
  var classList = [];

  $('.classList li a').each(function () {
    var $me = $(this);
    var item = {
      name : $me.text().trim(),
      url: $me.attr('href')
    };

    // 正则获取分类id
    var s = item.url.match(/articlelist_\d+_(\d+)_\d\.html/);

    if(Array.isArray(s)) {
      item.id = s[1];
      classList.push(item);
    }

  });

  console.log(classList);




})
