/**
 * @desc notify()
 * - http://notifyjs.com/ for examples / docs
 *
 * @param {Function} fn - the function to curry
 * @param {Number} [len] - specifies the number of arguments needed to call the function
 *
 * @return {Function} - the curried function
 */

const url = '//rawgit.com/clearhead/clearhead/master/bower_components/notifyjs/dist/notify.min.js';
let script = null;

function notify(...args) {

  // only notify in debug mode
  if (!/clearhead-debug=true/.test(document.cookie)) {
    return;
  }

  // wait for jQuery
  if (!window.jQuery) {
    return setTimeout(notify.bind(this, ...args), 1000);
  }

  script = script || jQuery.getScript(url); // promise

  script.done(function () {
    jQuery.notify.apply(jQuery, args.join(': '));
  });

}

export default notify;
