/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc when() polls or an jQuery && an element
 */
import log from './log';

function when(selector, callback, optTimeout) {
  var $this = typeof jQuery === 'function' ? jQuery(selector) : [];
  log('when:', selector, $this);
  return $this.length ? callback.call($this, $this) : setTimeout(
    when.bind(null, selector, callback, optTimeout),
    optTimeout || 50
  );
}

export default when;
