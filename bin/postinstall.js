#!/usr/bin/env node
'use strict';

var fs = require('fs');

var dirname = __dirname.split('/');
dirname.pop();
dirname = dirname.join('/');
dirname += '/lib/';

console.log(dirname);

fs.readdirSync(dirname).forEach(function (op) {
  if (op.charAt(0) === '.') return;
  var from = dirname + op;
  var to = from.replace('/lib/', '/');
  fs.renameSync(from, to);
});

