/**
 * @desc notify()
 * - http://notifyjs.com/ for examples / docs
 *
 * @param {Function} fn - the function to curry
 * @param {Number} [len] - specifies the number of arguments needed to call the function
 *
 * @return {Function} - the curried function
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var url = '//rawgit.com/clearhead/clearhead/master/bower_components/notifyjs/dist/notify.min.js';
var script = null;

function notify() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // only notify in debug mode
  if (!/clearhead-debug=true/.test(document.cookie)) {
    return;
  }

  // wait for jQuery
  if (!window.jQuery) {
    return setTimeout(notify.bind.apply(notify, [this].concat(args)), 1000);
  }

  script = script || jQuery.getScript(url); // promise

  script.done(function () {
    $.notify.apply($, args.join(': '));
  });
}

exports['default'] = notify;
module.exports = exports['default'];