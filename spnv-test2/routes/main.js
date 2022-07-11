var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.post('/', function(req, res) {

  console.log(req.body.fileName);
  res.send({'fileName': req.body.fileName});

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
