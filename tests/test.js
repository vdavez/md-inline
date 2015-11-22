// testConvert.js

var tape = require('tape');
var spawn = require('tape-spawn');
var fs = require('fs');

var expected = fs.readFileSync(__dirname + '/expected.md','utf8');

tape('test', function (t) {
  var st = spawn(t, 'node index.js tests/test.md');
  st.stdout.match(expected, 'The markdown matches!');
  st.end();
})
