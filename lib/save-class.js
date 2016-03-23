var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:save');

/**
 * 保存文章分类
 * @param  {array}   list
 * @param  {Function} callback
 */
module.exports = function (list, callback) {
  debug('保存文章分类列表到数据库: %d', list.length);


  async.eachSeries(list, function (item, next) {

    //查询分类 是否存在
    db.query("SELECT * FROM `class_list` WHERE `id` = ? LIMIT 1", [item.id], function (err, data) {
      if(err) {
        return next(data);
      }

      if(Array.isArray(data) && data.length > 0) {
        // 存在 则跳过
        next();
      } else {
        // 不存在 则插入
        db.query("INSERT INTO `class_list`(`id`,`name`,`url`) VALUES (?, ?, ?)", [item.id, item.name, item.url], next);
      }
    })
  }, callback);
};
