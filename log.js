/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc log() console.logs based on auto sniffing debug cookie
 *
 * @param {...args} args - prefixed with 'clearhead:'
 *
 * @return {null}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function log() {
  try {
    if (/clearhead-debug|localhost|optimizely_x/.test(location.href)) document.cookie = 'clearhead-debug=true;path=/;';

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (/clearhead-debug=true/.test(document.cookie)) console.info.apply(console, ['clearhead:'].concat(args));
  } catch (a) {}
}

exports['default'] = log;
module.exports = exports['default'];