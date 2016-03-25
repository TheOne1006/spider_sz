var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:save');


/**
 * 保存文章内容
 * @param  {int}   id
 * @param  {array}   tags
 * @param  {string}   content
 * @param  {Function} callback
 */
exports.save = function (id, tags, content, callback) {

  debug('保存文章内容 : %s', id);

  // 检测文章是否存在
  db.query("SELECT `id` FROM `article_detail` WHERE `id` =?", [id], function (err, data) {
    if(err) {
      return callback(err)
    }

    tags = tags.join(',');

    if(Array.isArray(data) && (data.length > 1) ) {
      // 更新
      db.query("UPDATE `article_detail` SET `tags` = ?, `content` = ? WHERE `id` =?",[tags, content, id], callback);
    } else {
      // 插入
      db.query("INSERT `article_detail`(`id`,`tags`,`content`) VALUES (?, ?, ?)", [id, tags, content], callback);
    }
  });


};


/**
 * 查询文章是否存在
 * @param  {string}   id
 * @param  {Function} callback
 */
exports.isExists = function (id, callback) {
  debug('查询文章是否存在: %s', id);
  db.query("SELECT `id` FROM `article_detail` WHERE `id` = ?", [id], function (err, data) {
    if(err) {
      return callback(err);
    }

    callback(null, Array.isArray(data) && data.length > 0);

  });
}
