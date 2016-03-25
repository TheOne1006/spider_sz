var cp = require('child_process');

var dir = cp.spawn('dir', ['/']);

// 当子进程有输出,自动将其输出到当前进程的输出标准流

dir.stdout.pipe(process.stdout);
dir.stderr.pipe(process.stderr);

// 进程解除触发 close 事件
dir.on('close', function (code) {
  console.log('结束进程, 代码 = %d', code);
});
