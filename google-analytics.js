/**
 * @desc googleAnalytics() sends information to googleAnalytics
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
function googleAnalytics(experimentId, customVariable) {

  $(function () {
    if (window.optimizely && window.optimizely.variationMap.hasOwnProperty(experimentId)) {
      window._gaq = window._gaq || [];
      var name = window.optimizely.data.experiments[experimentId].name;
      var variation = window.optimizely.variationNamesMap[experimentId];
      window._gaq.push(['_setCustomVar', customVariable, name, variation, 1]);
      window._gaq.push(['_trackEvent', 'Optimizely', name, variation, 0, true]);
    }
  });
}

exports['default'] = googleAnalytics;
module.exports = exports['default'];