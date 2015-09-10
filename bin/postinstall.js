#!/usr/bin/env node
'use strict';

var fs = require('fs');

var dirname = __dirname.split('/');
dirname.pop();
dirname = dirname.join('/');
dirname += '/lib/';

var dirs = [];

try { dirs = fs.readdirSync(dirname); }catch(e) {}

dirs.forEach(function (op) {
  if (op.charAt(0) === '.') return;
  var from = dirname + op;
  var to = from.replace('/lib/', '/');
  console.log('op:', op, 'from:', from, 'to:', to);
  fs.renameSync(from, to);
});

