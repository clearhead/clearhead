import fn from './jquery-polyfill/fn';
import fx from './jquery-polyfill/fx';

export default (_$) => {
  if (_$.chpoly) return;

  _$.chpoly = true;

  Object.assign(_$.fn, fn);
  // if _$ has no fx object, add animation methods to fn object
  Object.assign(_$.fx || _$.fn, fx);
};
