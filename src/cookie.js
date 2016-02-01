/**
 * @desc set() sets a cookie with optional days
 *  @param {String} name - the name of the cookie
 *  @param {String} value - the value of the cookie
 *  @param {Object} [options] - the domain and optDays options
 *  @param {String} [options.domain] - the cookie domain, e.g. '.example.com'
 *  @param {Number} [options.optDays] - days the cookie will exist for
 *    NOTE: Not passing optDays will create a "Session Cookie"
 *  @return {Undefined}

 * @desc get() gets value of cookie
 *  @param {String} name - name of cookie to get
 *  @return {String|Null} - string value of cookie NOT A BOOL!
 *
 * @desc del() removes cookie
 *  @param {String} name - name of cookie to delete
 *  @return {Undefined}
 */

const cookie = {
  set(name, { value = 'true', domain = '', optDays } = {}) {
    let expires = '';
    if (optDays) {
      const date = new Date();
      date.setTime(date.getTime() + (optDays * 24 * 60 * 60 * 1000));
      expires = date.toGMTString();
    }
    document.cookie = `${name}=${value}; domain=${domain}; expires=${expires}; path=/`;
  },
  get(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  del(name, domain = '') {
    document.cookie = `${name}=; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

export default cookie;
