var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

debug('读取博文列表');

var num = 1;
function readArticleList(url, cb) {
debug('第'+num+'页:'+url);
num++;

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

readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function (err, articlelist) {
  if(err) {
    console.error(err);
  }
  console.log(articlelist);
})
