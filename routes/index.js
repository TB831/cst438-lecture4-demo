var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', className: 'CST438', link: 'https://cst438-lecture4-demo-tb831.c9users.io/twitter' });
});

module.exports = router;
