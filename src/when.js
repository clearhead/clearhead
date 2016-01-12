/**
 * @desc when() polls or an jQuery && an element
 */
import log from './log';

function when(selector, callback, optTimeout, optQuitPolling) {
  // quit if we have gone past the optQuitPolling time
  if (optQuitPolling <= 0) {
    log(selector, ' not found, stopped polling');
    return false;
  }

  // sniff for jQuery in local namespace
  var $jq = (
    typeof jQuery === 'function' ? jQuery : (
      (typeof $ === 'function' && $.fn && $.fn.jquery) ? $ : undefined
    )
  );

  // search dom for element
  var $this = typeof $jq === 'function' ? $jq(selector) : [];

  log('when:', selector, $this);

  var timeToQuit = optQuitPolling ? optQuitPolling - (optTimeout || 50) : undefined;

  return $this.length ? callback.call($this, $this) : setTimeout(
    when.bind(null, selector, callback, optTimeout, timeToQuit),
    optTimeout || 50
  );

}

export default when;
