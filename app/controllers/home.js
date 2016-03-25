
var article = require('../models/article');
var class_list = require('../models/class_list');

exports.home = function (req, res, next) {
  article
    .articleListByClassId(0, 0, 20, function (err, list) {
      if(err) {
        return next(err);
      };

      res.locals.articleList = list;
      res.render('home');
    });
};
