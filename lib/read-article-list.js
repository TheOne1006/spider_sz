var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:read');

/**
 * 请求指定url, 抓取文章列表信息
 * @param  {string}   url
 * @param  {Function} callback
 */
module.exports = readArticleList;


function readArticleList(url, cb) {
debug('读取博文列表: %s', url);

  request(url,function (err, res, body) {

    if(err) {
      return cb(err);
    }
    // DOM 操作
    var $ = cheerio.load(body);

    // 博文列表
    var articleList = [];

    $('.articleList .articleCell')
      .each(function () {
        var $me = $(this);
        var $title = $me.find('.atc_title a');
        var $time = $me.find('.atc_tm');
        var item = {
          title : $title.text().trim(),
          url: $title.attr('href'),
          time: $time.text().trim()
        };

        // url: http://blog.sina.com.cn/s/blog_69e72a420102w0tg.html
        // URL 去除文章id
        var s = item.url.match(/blog_(\w+)\.html/);

        if(Array.isArray) {
          item.id = s[1];
          articleList.push(item);
        }
      });

      // 检查是否有下一页
      var nextUrl = $('.SG_pgnext a').attr('href');

      if(nextUrl) {
        readArticleList(nextUrl, function (err, list) {
          if(err) {
            return cb(err);
          }

          cb(null, articleList.concat(list));
        })
      }else {
        cb(null, articleList);
      }

  });
}
