var CronJob = require('cron').CronJob;

var job1 = new CronJob('* * * * * *', function () {
  console.log('每秒执行一次');
});

job1.start();

var job2 = new CronJob('*/5 * * * * *', function () {
  console.log('每5秒执行一次');
});

job2.start();
