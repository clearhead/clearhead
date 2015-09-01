/**
 * @desc pollyfill($) returns a pollyfilled jQuery
 *
 * @param {Function} $ - the jQuery instance to pollyfill
 *
 * @return {void}
 * 
 * usage:
 *   import pollyfill from 'clearhead/optimizely-jquery-polyfill';
 *   pollyfill($); // local ref to optimizely.$
 * 
 */
import fn from './optimizely-jquery-polyfill/fn';
import fx from './optimizely-jquery-polyfill/fx';

export default (_$) => {
  if (_$.chpoly) return;

  _$.chpoly = true;

  Object.assign(_$.fn, fn);
  // if _$ has no fx object, add animation methods to fn object
  Object.assign(_$.fx || _$.fn, fx);
};
