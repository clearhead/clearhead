/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc #store exposes a simple pattern to get / set from localStorage
 *
 * @return {store} - store.get, store.set, store.del
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var noop = function noop() {
  var _console$error;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_console$error = console.error).call.apply(_console$error, [console, 'window.localStorage undefined'].concat(args));
};
var store = typeof window !== 'undefined' ? window.localStorage : {
  getItem: noop,
  setItem: noop,
  removeItem: noop
};

exports['default'] = {
  get: store.getItem.bind(store),
  set: store.setItem.bind(store),
  del: store.removeItem.bind(store)
};
module.exports = exports['default'];