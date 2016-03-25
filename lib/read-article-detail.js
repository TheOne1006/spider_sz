var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:read');

/**
 * 请求指定url, 抓取文章详细信息
 * @param  {string}   url
 * @param  {Function} callback
 */
module.exports = function (url, callback) {
  debug('读取博文内容: %s', url);

  request(url, function (err, res, body) {
    if(err) {
        return callback(err);
    }

    var $ = cheerio.load(body);

    // 获取标签
    var tags = [],
      content;

    $('.blog_tag h3 a')
      .each(function () {
        var tag = $(this).text().trim();
        if(tag) {
          tags.push(tag);
        }
      });

    // 获取内容
   content = $('.articalContent').html().trim();

   callback(null, {tags:tags, content: content});
  });
}
