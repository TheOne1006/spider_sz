var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:save');


/**
 * 保存文章标签
 * @param  {int}   id
 * @param  {array}   tags
 * @param  {Function} callback
 */
module.exports = function (id, tags, callback) {
  debug('保存文章标签: %s, %s', id, tags);

  if(tags.length > 0) {
    // 生成sql 代码段
    var values = tags.map(function (tag) {
      return '( '+ db.escape(id) + ','+ db.escape(tag) +')';
    }).join(',');
    
    db.query('INSERT IGNORE INTO `article_tag`(`id`,`tag`) VALUES '+ values, callback);
  } else {
    callback();
  }
};
