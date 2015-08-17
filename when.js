/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc when() polls or an jQuery && an element
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function when(selector, callback, optTimeout) {
  var $this = typeof jQuery === 'function' ? jQuery(selector) : [];
  (0, _log2['default'])('when:', selector, $this);
  return $this.length ? callback.call($this, $this) : setTimeout(when.bind(null, selector, callback, optTimeout), optTimeout || 50);
}

exports['default'] = when;
module.exports = exports['default'];