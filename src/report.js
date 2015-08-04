/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc report() sends a errors back to GA as events for wallboards
 *
 * @param {String} idx - idx sent as event action
 * @param {Error} args - concatenated and reported args
 *
 * @return {undefined}
 */

const UA = 'UA-33947856-2';
const endpoint = 'https://ssl.google-analytics.com/collect?';
import log from './log';

function report(idx, ...errors) {
  try {
    const query = [];
    const error = errors.join(' - ');
    const params = {
      v: 1,
      cid: getUID().toString(),
      tid: UA,
      t: 'event',
      ec: location.hostname,
      ea: idx.toString(),
      el: error,
      z: (new Date()).getTime(),
    };
    Object.keys(params).forEach(function(key) {
      let value = params[key];
      query.push(key + '=' + encodeURIComponent(value));
    });
    const src = endpoint + query.join('&');
    new Image().src = src;
    log('reported:', error, src);
  } catch (e) {}
}

export default report;

/*jshint latedef:false*/
function getUID() {
  const cookie = /(optimizelyEndUserId|mt\.v)=([^;]+)/;
  let uid = (new Date()).getTime();
  try {
    uid = cookie.exec(document.cookie)[2];
  } catch (e) {}
  uid = uid.replace(/[^\d\s]/g, '');
  return uid;
}
