var async = require('async');
var db = require('../config').db;
var debug = require('debug')('blog:save');



/**
 * 保存文章列表
 * @param  {number}  class_id
 * @param  {array}   list
 * @param  {Function} callback
 */
module.exports = function (class_id, list, callback) {
    debug('保存文章列表到数据库: class: %d, list.length: %d', class_id, list.length);

    async.eachSeries(list, function (item, next) {

      // 查询文章是否存在列表中
      db.query("SELECT * FROM `article_list` WHERE `id` = ? AND `class_id` = ? LIMIT 1 ", [item.id, class_id], function(err, data){
        if(err) {
          return next(err)
        }

        // 转换时间戳
        var created_time = new Date(item.time).getTime() / 10000;

        if(Array.isArray(data) && data.length >= 1) {
            // 更新 ??
            next();
        }else {
          // 分类不存在
          db.query("INSERT INTO  `article_list`(`id`,`title`,`url`,`class_id`,`created_time`) VALUES (?,?,?,?,?)", [item.id, item.title, item.url, class_id, created_time], next);
        }

      })
    }, callback);

};
