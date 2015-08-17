/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc wrap() - helper pattern for try / catch / report
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _report = require('./report');

var _report2 = _interopRequireDefault(_report);

function wrap(str, fn) {
  try {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    fn.apply(this, args);
  } catch (e) {
    (0, _report2['default'])(e, str);
  }
}

exports['default'] = wrap;
module.exports = exports['default'];