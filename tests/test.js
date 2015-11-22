// testConvert.js

var tape = require('tape');
var spawn = require('tape-spawn');
var fs = require('fs');

var expected = fs.readFileSync(__dirname + '/expected.md','utf8');

tape('testing -f flag', function (t) {
  var st = spawn(t, 'node index.js -f tests/test.md');
  st.stdout.match(expected, 'The markdown matches!');
  st.end();
})

tape('testing process.stdin', function (t){
  var st = spawn(t, 'cd tests && cat test.md | node ../index.js');
  st.stdout.match(expected, 'The markdown matches!');
  st.end();
})
