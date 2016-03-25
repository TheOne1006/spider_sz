/**
 * 所有读取和存储操作
 */

var async = require('async');
var config = require('../config');
// read
var readClass = require('./read-class');
var readArticleList = require('./read-article-list');
var readArticleDetail = require('./read-article-detail');

// save
var saveClass = require('./save-class');
var saveArticle = require('./save-article');
var saveArticleTags = require('./save-articleTags');
var saveClassCount = require('./save-class-count')
var saveArticleList = require('./save-article-list')


var debug = require('debug')('blog:all');

var classList,
  articleList = {};

async.series([

  // 获取分类列表
  function (done) {
    readClass(config.sinaBlog.url, function (err, list) {
      classList = list;
      // debug('classList');
      // debug(list);
      done(err);
    })
  },
  // 保存分类
  function (done) {
    saveClass(classList, done)
  },
  // 依次获取分类下的文章
  function (done) {
    async.eachSeries(classList, function (c, next) {
      readArticleList(c.url, function (err, list) {
        articleList[c.id] = list;
        next(err);
      })
    },done);
  },
  // 保存文章列表
  function (done) {
    async.eachSeries(Object.keys(articleList), function (classId, next) {
      saveArticleList(classId, articleList[classId], next);
    }, done);
  },
  // 保存文章数量
  function (done) {
    async.eachSeries(Object.keys(articleList), function (classId, next) {
      saveClassCount(classId, articleList[classId].length, next);
    }, done);
  },
  // 去除重复文章
  function (done) {

    debug('去除重复文章');
    var articles = {};

    Object.keys(articleList).forEach(function (classId) {
      debug('--classId: %s', classId);
      articleList[classId].forEach(function (item) {
        articles[item.id] = item;
      });
    });

    articleList = [];

    Object.keys(articles).forEach(function (id) {
      articleList.push(articles[id]);
    });

    done();
  },
  // 依次读取文章内容,并保存
  function (done) {
    async.eachSeries(articleList, function (item, next) {
      saveArticle.isExists(item.id, function (err, exists) {
        if(err) {
          return  next(err);
        }

        if(exists) {
          debug('文章已存在 :%s', item.url);
          return next();
        }

        // 获取详情信息

        readArticleDetail(item.url, function (err, ret) {
          if(err) {
            return next(err);
          }


          saveArticle.save(item.id, ret.tags, ret.content, function (err) {
            if(err) {
              return next(err);
            }
            
            saveArticleTags(item.id, ret.tags, next);
          });

        });

      });
    }, done);
  }
], function (err) {
  if(err) {
    console.error(err);
  }
  console.log('完成');

  process.exit(0);

});

















// -
