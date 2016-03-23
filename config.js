// 数据库连接配置

var mysql  = require('mysql');

exports = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'sina_blog',
  user: 'root',
  password: 'root'
});

exports.sinaBlog = {
  url: 'http://blog.sina.com.cn/u/1776757314'
};
