/**
 * @desc debounce() prevents a function from being invoked repeatedly.
 * The function will be called again after it stops being called for N milliseconds.
 *
 * @param {Function} fn - the function to debounce
 * @param {Number} wait - rate limit in milliseconds
 * @param {Boolean} [leading=false] - if true, trigger fn on leading edge
 *
 * @return {Function} - the debounced function
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function debounce(fn, wait) {
  var leading = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var timeout = undefined;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    function later() {
      timeout = null;
      if (!leading) fn.apply(undefined, args);
    }

    var callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(undefined, args);
  };
}

exports["default"] = debounce;
module.exports = exports["default"];