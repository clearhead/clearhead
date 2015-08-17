/**
 * @desc loadScript() loads a script and fires callback
 *
 * @param {String} url - url of script to load
 * @param {Function} callback - optional callback to fire on load
 *
 * @return {undefined}
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function loadScript(url, optCallback) {
  'use strict';
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = url;
  if (typeof callback === 'function') {
    ga.onload = callback;
  }
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
}

exports['default'] = loadScript;
module.exports = exports['default'];