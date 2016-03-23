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

    // 查询文章是否存在列表中
    db.query("SELECT * FROM `article_list`")
};
