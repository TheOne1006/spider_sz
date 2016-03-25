// 计划任务
var spawn = require('child_process').spawn;
var CronJob = require('cron').CronJob;
var config = require('../config');


module.exports = function () {

var job = new CronJob(config.autoUpdateCron, function () {
  console.log('开始执行定时任务');

  var update = spawn(process.execPath, [__dirname +'/jobs.js']);

  update.stdout.pipe(process.stdout);
  update.stderr.pipe(process.stderr);

  update.on('close', function (code) {
    console.log('更新结束 代码=%d', code);
  });
});

job.start();

}
