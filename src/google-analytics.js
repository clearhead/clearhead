/**
 * @desc googleAnalytics() sends information to googleAnalytics
 *
 * @param {Number} experimentId - experimentId to send
 * @param {Number} customVariable - customVariable to send
 *
 * @return {undefined}
 */

function googleAnalytics(experimentId, customVariable) {

  $(function() {
    if (window.optimizely && window.optimizely.variationMap.hasOwnProperty(experimentId)) {
      window._gaq = window._gaq || [];
      var name = window.optimizely.data.experiments[experimentId].name;
      var variation = window.optimizely.variationNamesMap[experimentId];
      window._gaq.push(['_setCustomVar', customVariable, name, variation, 1]);
      window._gaq.push(['_trackEvent', 'Optimizely', name, variation, 0, true]);
    }
  });

}

export default googleAnalytics;
