var mysql = require('mysql');


var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root'
});

conn.connect();

conn.query('SELECT 1 + 1 AS solution', function (err, rows) {
  if(err) {
    throw err;
  }
  console.log(rows);
  conn.end();
});

//
// conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//
//   console.log('The solution is: ', rows[0].solution);
// });
//
// conn.end();
