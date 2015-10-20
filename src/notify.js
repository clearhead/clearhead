/**
 * @desc notify()
 * - http://notifyjs.com/ for examples / docs
 *
 * @param {Function} fn - the function to curry
 * @param {Number} [len] - specifies the number of arguments needed
 *                         to call the function
 *
 * @return {Function} - the curried function
 */

import doc from './helpers/document';
import loc from './helpers/location';

const url = '//rawgit.com/clearhead/clearhead/' +
  'master/bower_components/notifyjs/dist/notify-combined.min.js';

if (/clearhead-notify/.test(loc.href)) {
  doc.cookie = '/clearhead-notify=true;path=/;';
}

let should = /clearhead-notify=true/.test(doc.cookie);
let script = null;

function notify(...args) {
  'use strict';

  // only notify in debug mode
  if (!should) return;

  // wait for jQuery
  if (!window.jQuery) {
    return setTimeout(notify.bind(null, ...args), 1000);
  }

  script = script || jQuery.getScript(url); // promise

  script.done(function() {
    jQuery.notify(args.join(': '));
  });

}

export default notify;
