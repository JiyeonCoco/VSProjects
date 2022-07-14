var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.post('/', function(req, res) {

  console.log(req.body.fileName);
  res.end();

  const spawn = require('child_process').spawn;
  const result = spawn('python', ['test.py', req.body.fileName]);

  // stdout의 'data'이벤트리스너로 실행결과를 받는다
  result.stdout.on('data', function(data) {
      console.log(data.toString());
  });

  // 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다
  result.stderr.on('data', function(data) {
      console.log(data.toString());
  });
});

module.exports = router;
