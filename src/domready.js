/**
 * @desc domready() runs a function on domready - to be used
 *                  on sites that don't have jQuery right away
 *                  and/or not at all but you need to wait
 *                  till the dom is ready to run something
 *
 * @param {Function} fn - the function to run on domready
 *
 * @return {undefined}
 */

// require('../bower_components/domready/ready.min.js');
function domready() {

  var fns = [],
    listener, doc = document,
    hack = doc.documentElement.doScroll,
    domContentLoaded = 'DOMContentLoaded',
    loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
    doc.addEventListener(domContentLoaded, listener = function() {
      doc.removeEventListener(domContentLoaded, listener)
      loaded = 1
      while (listener = fns.shift()) listener()
    })

  return function(fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

}

export default domready;
