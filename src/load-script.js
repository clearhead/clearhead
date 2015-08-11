/**
 * @desc loadScript() loads a script and fires callback
 *
 * @param {String} url - url of script to load
 * @param {Function} callback - optional callback to fire on load
 *
 * @return {undefined}
 */

function loadScript(url, optCallback) {
  'use strict';
  const ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = url;
  if (typeof callback === 'function') {
    ga.onload = callback;
  }
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
}

export default loadScript;
