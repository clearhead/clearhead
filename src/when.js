/**
 * @desc when() polls or an jQuery && an element
 * You can disable the log call by adding silentWhen=true as a query parameter to the page
 * or creating a silentWhen variable on the window and setting it to true;
 *
 * @param {string} [selector] - Any valid jQuery selector
 * @param {function|array} [callback] - A callback function to run once the selected element has been found OR a multidimensional array which looks like ['method', ['arguments',...]] to call on that jQuery object
 * @param {int} [optTimeout] - How frequently to check for the element (milliseconds)
 * @param {int} [optQuitPolling] - How many milliseconds after which to stop checking for the element
 */
import log from './log';
import getParam from './get-param';

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

  if((getParam('silentWhen') === '' || getParam('silentWhen') !== 'true') && window.silentWhen !== true) {
    log('when:', selector, $this);
  }

  var timeToQuit = optQuitPolling ? optQuitPolling - (optTimeout || 50) : undefined;

  //If the desired element has been found
  if($this.length) {
    var getType = {};
    //If the supplied callback was indeed a function
    if(callback && getType.toString.call(callback) === '[object Function]') {
      //Run it
      return callback.call($this, $this);
    }
    //If the supplied callback was actually an array that looks like a jQuery method
    else if(callback.constructor === Array && callback.length === 2 && callback[1].constructor === Array) {
      //Run that on the element we just found
      return $this[callback[0]].apply($this, callback[1]);
    }
  }
  else {
    //Check again in 50miliseconds
    return setTimeout(
      when.bind(null, selector, callback, optTimeout, timeToQuit),
      optTimeout || 50
    );
  }

}

export default when;
