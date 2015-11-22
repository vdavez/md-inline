#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var mime = require('mime');
var path = require('path');

// Replace markdown img regex with <img> with base64 data uri & pipe to stdout
var re =/!\[\]\(([^]*?)\)/g;
var dir = "";

// Read file passed in command line args
if (argv['f']){
  var f = fs.readFileSync(argv['f'],'utf8');
  var dir = path.dirname(argv['f']);
  process.stdout.write(f.replace(re, replaceImagesWithBase64));
}
else {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {
    process.stdout.write(chunk.replace(re, replaceImagesWithBase64));
  })
}


/**
 * Helper function to replace a markdown img with <img> tag with data uri
 * @param {string} match the markdown img
 * @param {string} p1 the filename of the img src
 * @returns {string} the converted <img> tag with data uri
 */
function replaceImagesWithBase64(match, p1) {
  var f = path.join(dir, p1);

  return (
    // Check the filename to see if it's a URL, and if so, ignore it
    p1.substr(0,4) === "http" ? match :

      // Otherwise, it's a local file that should be replaced with base64 encoding
      "<img src='data:" + mime.lookup(f) + ";base64," + fs.readFileSync(f,'base64') + "'/>"
    )
}
