var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:read');

/**
 * 请求指定url, 抓取分类列表信息
 * @param  {string}   url
 * @param  {Function} callback
 */
module.exports = function (url, callback) {
  debug('读取文章分类列表: %s', url);

  request(url, function (err, res, body) {
    if(err) {
      return callback(err);
    }

    var $ = cheerio.load(body),
      classList = [];

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

    callback(null, classList);
  });
}
