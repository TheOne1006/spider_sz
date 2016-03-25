var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:save');

/**
 * 保存文章分类数量
 * @param  {int}   class_id
 * @param  {int}   count
 * @param  {Function} callback
 */
module.exports = function (class_id, count, callback) {
  debug(' 保存文章分类数量: %d, %d', class_id, count);

  db.query("UPDATE `class_list` SET `count` = ? WHERE `id` = ? ", [count, class_id], callback);
};
