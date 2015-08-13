/**
 * @desc getParam() gets a param value from location.search
 *
 * @param {String} name - key of param to find
 * @param {String} optSearch - optional search string to search in (default: location.search)
 *
 * @return {String} param value
 */

function getParam(name, optSearch) {
  'use strict';
  optSearch = optSearch || location.search;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(optSearch);
  return results === null ?
    '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export default getParam;
