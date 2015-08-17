/**
 * @desc batch() batches an array into smaller arrays of length n.
 *
 * @param {Array} arr - the array to split into batches
 * @param {Number} n - the desired length of each batch
 *
 * @return {Array[]} array of arrays of length n
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function batch(arr, n) {
  var len = arr.length;
  var batches = [];

  var i = 0;
  while (i < len) batches.push(arr.slice(i, i += n));

  return batches;
}

exports["default"] = batch;
module.exports = exports["default"];