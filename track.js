/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc track() send prop to sitecat
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function track(prop, goalName) {
  (0, _log2['default'])('goal:', prop, goalName);
  if (!window.s) return (0, _log2['default'])('goal error: window.s undefined');
  if (!s.tl) return (0, _log2['default'])('goal error: s.tl undefined');
  s.linkTrackVars = prop;
  s.linkTrackEvents = 'None';
  s[prop] = goalName; // unique
  s.tl(true, 'o', 'Clearhead Goal'); // static params / do not update
}

exports['default'] = track;
module.exports = exports['default'];