/**
 * @desc set() sets a cookie with optional days
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var cookie = {
  set: function set(name, value, optDays) {
    'use strict';
    var expires = '';
    if (optDays) {
      var date = new Date();
      date.setTime(date.getTime() + optDays * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  },
  get: function get(name) {
    'use strict';
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
};

exports['default'] = cookie;
module.exports = exports['default'];