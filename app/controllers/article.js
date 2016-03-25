
var debug = require('debug')('blog:web:controller');
var article = require('../models/article');
var class_list = require('../models/class_list');

exports.index = function (req, res, next) {
  var id = req.params.id;

  article
    .articleInfoById(id, function (err, article) {
      if(err) {
        return next(err);
      }

      res.locals.article = article;
      res.render('article');
    });
};
