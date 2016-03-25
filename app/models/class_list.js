var async = require('async');
var db = require('../../config').db;
var debug = require('debug')('blog:web:read');

/**
 * 分类
 */


/**
 * 获取分行分类
 */
exports.classList = function (cb) {
  debug('获取文章分类列表');
  db
    .query("SELECT * FROM `class_list` ORDER BY `id` ASC", cb);
};

/**
 * 检测分类是否存在
 * @param  {string}   id
 * @param  {Function} cb
 */
exports.isClassExists = function (id, cb) {
  debug('检测分类是否存在: %s', id);

  db
    .query("SELECT * FROM `class_list` WHERE `id` = ? LIMIT 1 ", [id], function (err, ret) {
      if(err) {
        return cb(err);
      }

      cb(null, Array.isArray(ret) && ret.length > 0);
    });
};


/**
 * 获取指定分类信息
 * @param  {[type]}   id
 * @param  {Function} cb
 */
exports.getClassById = function (id, cb) {
  debug('获取指定分类信息: %s', id);

  db
    .query("SELECT * FROM `class_list` WHERE `id` = ? LIMIT 1 ", [id], function (err, ret) {
      if(err) {
        return cb(err);
      }

      if(!(ret.length > 0)) {
        return cb(new Error('该分类不存在'));
      }

      cb(null, ret[0]);
    });
};
