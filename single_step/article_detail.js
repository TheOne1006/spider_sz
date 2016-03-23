var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');


debug('读取博文内容');

request('http://blog.sina.com.cn/s/blog_69e72a420101gvec.html', function (err, res, body) {
  if(err) {
      return console.error(err);
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

 console.log({tags:tags, content: content});


});
