'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _optimizelyJqueryPolyfillFn = require('./optimizely-jquery-polyfill/fn');

var _optimizelyJqueryPolyfillFn2 = _interopRequireDefault(_optimizelyJqueryPolyfillFn);

var _optimizelyJqueryPolyfillFx = require('./optimizely-jquery-polyfill/fx');

var _optimizelyJqueryPolyfillFx2 = _interopRequireDefault(_optimizelyJqueryPolyfillFx);

exports['default'] = function (_$) {
  if (_$.chpoly) return;

  _$.chpoly = true;

  _extends(_$.fn, _optimizelyJqueryPolyfillFn2['default']);
  // if _$ has no fx object, add animation methods to fn object
  _extends(_$.fx || _$.fn, _optimizelyJqueryPolyfillFx2['default']);
};

module.exports = exports['default'];