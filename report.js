/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc report() sends a errors back to GA as events for wallboards
 *
 * @param {String} idx - idx sent as event action
 * @param {Error} args - concatenated and reported args
 *
 * @return {undefined}
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var UA = 'UA-33947856-2';
var endpoint = 'https://ssl.google-analytics.com/collect?';

function report(idx) {
  var _arguments = arguments;

  try {
    var _len, errors, _key;

    (function () {
      var query = [];

      for (_len = _arguments.length, errors = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        errors[_key - 1] = _arguments[_key];
      }

      var error = errors.join(' - ');
      var params = {
        v: 1,
        cid: getUID().toString(),
        tid: UA,
        t: 'event',
        ec: location.hostname,
        ea: idx.toString(),
        el: error,
        z: new Date().getTime()
      };
      Object.keys(params).forEach(function (key) {
        var value = params[key];
        query.push(key + '=' + encodeURIComponent(value));
      });
      var src = endpoint + query.join('&');
      new Image().src = src;
      (0, _log2['default'])('reported:', error, src);
    })();
  } catch (e) {}
}

exports['default'] = report;

/*jshint latedef:false*/
function getUID() {
  var cookie = /(optimizelyEndUserId|mt\.v)=([^;]+)/;
  var uid = new Date().getTime();
  try {
    uid = cookie.exec(document.cookie)[2];
  } catch (e) {}
  uid = uid.replace(/[^\d\s]/g, '');
  return uid;
}
module.exports = exports['default'];