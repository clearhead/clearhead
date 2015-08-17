/**
 * @desc curry() returns a curried function that will
 * not be called until all arguments received.
 *
 * @param {Function} fn - the function to curry
 * @param {Number} [len] - specifies the number of arguments needed to call the function
 *
 * @return {Function} - the curried function
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function curry(fn, len) {
  var fnlen = len || fn.length;

  return function wait() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length >= fnlen) return fn.apply(undefined, args);
    return wait.bind.apply(wait, [null].concat(args));
  };
}

exports["default"] = curry;
module.exports = exports["default"];