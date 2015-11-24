/**
 * @desc googleTagManager() exposes information to googleTagManager by 
 *                          setting a global variable
 *
 * @param {Number} experimentId - experimentId to send
 * @param {Number} customVariable - customVariable to send
 *
 * @return {undefined}
 */

function googleTagManager(experimentId, customVariable) {
  try {
    window.clearhead = window.clearhead || {};
    window.clearhead.gtm = window.clearhead.gtm || {};
    Object.defineProperty(window.clearhead.gtm, 'ab' + customVariable, {
      get: function() {
        var name, val;
        try {
          name = window.optimizely.data.experiments[experimentId].name;
          val = window.optimizely.variationNamesMap[experimentId];
        } catch (e) {}
        return (name && val) ? name + ': ' + val : undefined;
      },
    });
  } catch (e) {}
}

export default googleTagManager;
