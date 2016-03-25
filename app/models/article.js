var async = require('async');
var db = require('../../config').db;
var debug = require('debug')('blog:web:read');

/**
 * 文章
 */


/**
 * 文章详情
 * @param  {[type]}   id
 * @param  {Function} cb
 */
exports.articleInfoById = function (id, cb) {

  debug('获取文章详细信息: %s', id);

  var sql = "SELECT * FROM `article_detail` AS `detail`" +
    " LEFT JOIN `article_list` AS `list` ON `detail`.`id` = `list`.`id` " +
    " WHERE `detail`.`id` = ? LIMIT 1";

  db.query(sql,[id], function (err, list) {
    if(err) {
      return cb(err);
    }
    if(!(list.length) > 0) {
      return cb(new Error('文章不存在'));
    }

    cb(null, list[0]);
  });

};


/**
 * 获取指定分类下的文章列表
 * @param  {Number}   classId
 * @param  {Number}   offset
 * @param  {Number}   limit
 * @param  {Function} cb
 */
exports.articleListByClassId = function (classId, offset, limit, cb) {

  debug('获取指定分类下的文章列表: %s, %s, %s', classId, offset, limit);

  var sql = "SELECT * FROM `article_detail` AS `detail` " +
    " LEFT JOIN `article_list` AS `list` ON `detail`.`id` = `list`.`id` " +
    " WHERE `list`.`class_id` = ? " +
    " ORDER BY `created_time` DESC limit ?, ?";

  db.query(sql, [classId, offset, limit], cb);

};


exports.articlsListByTag = function (tag, offset, limit, cb) {

  debug('获取指定tag下的文章列表: %s, %s, %s', tag, offset, limit);

  var sql = "SELECT * FROM `article_detail` AS `detail` " +
    " WHERE `id` IN ( " +
    " SELECT `id` FROM `article_tag` WHERE `tag` = ? "+
    " ) "+
    " ORDER BY `created_time` DESC LIMIT ?,? ";

  db.query(sql, [tag, offset, limit], cb);
};


exports.articleCountByTag = function (tag, cb) {

  debug('获取指定标签下的文章: %s', tag);

  db
    .query("SELECT count(*) AS `c` FROM `article_tag` WHERE `tag` = ?", [tag], function (err, ret) {
      if(err) {
        return cb(err);
      }

      cb(null, ret[0].c);
    });
};








// -
