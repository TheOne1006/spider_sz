var mysql = require('mysql');

var debug = require('debug')('blog:update');

var db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'sina_blog',
  user: 'root',
  password: 'root'
});


db.query('show tables', function (err, tables) {
  if(err) {
    console.error(err);
  } else {
    console.log(tables);
  }

  db.end();

})
