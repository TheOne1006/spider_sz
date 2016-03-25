## Node.js 实战

### pre_dev 前置知识

1. request
2. cheerio
3. mysql
4. async
5. debug
6. cron
  - 模拟linux cron 执行任务
7. child_process


### single_step 抓取案例


### 数据库创建


### 抓取信息,入库

### 页面展示

### 定制任务 执行脚本

### uncaughtException 事件

1. 大多数,异步 I/O 操作(读/写本地文件,网络链接) 发生的错误是无法被 `try catch` 捕捉,会导致 `Node.js` 直接退出.
2. 如果Node.js 抛出一个 异常 没有被任何 `try catch` 捕捉到,会 __尝试__ 将这些错误 交给 `uncaughtException` 事件处理
3. 没有注册 `uncaughtException` 事件处理程序时,才会导致进程直接退出.


### pm2
1. 进程管理器
2. 安装: `npm install -g pm2`
3. `start`: `pm2 start <path>/<to>/app.js`;
4. `stop`: `pm2 stop <path>/<to>/app.js`;
