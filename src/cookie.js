/**
 * @desc set() sets a cookie with optional days
 */

const cookie = {
  set(name, value, optDays) {
    'use strict';
    let expires = '';
    if (optDays) {
      const date = new Date();
      date.setTime(date.getTime() + (optDays * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  },
  get(name) {
    'use strict';
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
};

export default cookie;
