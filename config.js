// 数据库连接配置

var mysql  = require('mysql');

exports.db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'sina_blog',
  user: 'root',
  password: 'root'
});

exports.sinaBlog = {
  url: 'http://blog.sina.com.cn/u/1776757314'
};

exports.port = 3000;

// 30 分钟执行一次
exports.autoUpdateCron = '* */30 * * * *';
