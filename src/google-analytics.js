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
    var EXPERIMENT_ID = experimentId;
    var CUSTOM_VAR = customVariable;
    if (window.optimizely && window.optimizely.variationMap.hasOwnProperty(EXPERIMENT_ID)) {
      window._gaq = window._gaq || [];
      var name = window.optimizely.data.experiments[EXPERIMENT_ID].name;
      var variation = window.optimizely.variationNamesMap[EXPERIMENT_ID];
      window._gaq.push(['_setCustomVar', CUSTOM_VAR, name, variation, 1]);
      window._gaq.push(['_trackEvent', 'Optimizely', name, variation, 0, true]);
    }
  });

}

export default googleAnalytics;
