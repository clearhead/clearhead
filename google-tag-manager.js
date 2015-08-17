/**
 * @desc googleTagManager() sends information to googleTagManager
 *
 * @param {Number} experimentId - experimentId to send
 * @param {Number} customVariable - customVariable to send
 *
 * @return {undefined}
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function googleTagManager(experimentId, customVariable) {
  try {
    window.clearhead = window.clearhead || {};
    window.clearhead.gtm = window.clearhead.gtm || {};
    Object.defineProperty(window.clearhead.gtm, 'ab' + customVariable, {
      get: function get() {
        var name, val;
        try {
          name = window.optimizely.data.experiments[experimentId].name;
          val = window.optimizely.variationNamesMap[experimentId];
        } catch (e) {}
        return name && val ? name + ': ' + val : undefined;
      }
    });
  } catch (e) {}
}

exports['default'] = googleTagManager;
module.exports = exports['default'];