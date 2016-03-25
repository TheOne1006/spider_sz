var homeCtrl = require('./controllers/home');
var articleCtrl = require('./controllers/article');


module.exports = function (app, config) {

  app.get('/', homeCtrl.home);
  app.get('/article/:id', articleCtrl.index)
};
