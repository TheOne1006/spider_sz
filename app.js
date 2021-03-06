
var path = require('path');
var express = require('express');
var config = require('./config');


// route
var route = require('./app/route');

var job = require('./lib/jobs');
job();

var app = express();


// 配置 express

app.set('views',__dirname + '/app/views');
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname,'public')));

route(app);

app.listen(config.port, function () {
  console.log('服务器启动, 端口:'+ config.port);
});

// 处理任何未捕获的异常
process.on('uncaughtException', function (err) {
  console.error('uncaughtException: %s', err.stack);
});
