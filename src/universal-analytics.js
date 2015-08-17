/**
 * @desc universalAnalytics() sends information to universalAnalytics
 *
 * @param {Number} experimentId - experimentId to send
 * @param {Number} customVariable - customVariable to send
 *
 * @return {undefined}
 */

function universalAnalytics(experimentId, customVariable) {

  $(function() {
    if (window.optimizely &&
      window.optimizely.variationMap.hasOwnProperty(experimentId) &&
      window.ga && typeof ga === 'function') {
      var name = window.optimizely.data.experiments[experimentId].name;
      var variation = window.optimizely.variationNamesMap[experimentId];
      window.ga('set', 'dimension' + customVariable, name + ': ' + variation);
      window.ga('send', 'event', 'optimizely', name, variation, {
        'nonInteraction': 1,
      });
    }
  });

}

export default universalAnalytics;
