var debug = require('debug')('myapp:main');


debug('现在时间是 %s', new Date());


/**
 * export DEBUG=myapp:*
 * 只有 匹配条件的才会输出 debug 信息
 */
