/**
 * @desc coremetrics() sends information to coremetrics
 *
 * @param {Number} experimentId - experimentId to send
 *
 * @return {undefined}
 */

function coremetrics(experimentId) {
  $(function() {
    try {

      // DO NOT EDIT BELOW THIS LINE
      var o = window.optimizely,
        v = o.data.variations,
        vId = o.variationIdsMap[experimentId],
        vIndex = o.variationMap[experimentId];

      var isMvt = vId.length > 1,
        eName = o.data.experiments[experimentId].name;

      var cmKey = (isMvt ? 'MVT' : 'AB') + ' Test: ' + eName + '';
      var cmValue, i;

      if (!isMvt) {
        var isControl = o.variationMap[experimentId] === 0;
        cmValue = isControl ? 'Control' : 'V' + vIndex.toString() + ': ' + o.variationNamesMap[experimentId];
      } else {
        var valueArray = [],
          s = o.data.sections,
          sId = o.data.experiments[experimentId].section_ids;
        for (i = 0; i < sId.length; i++) {
          if (vIndex[i] !== 0) {
            valueArray.push(s[sId[i]].name.toString() + ': ' + v[vId[i]].name);
          }
        }
        cmValue = valueArray.length === 0 ? 'Control' : valueArray.join(', ');
      }
      window.cmCreateElementTag(cmValue, cmKey);
    } catch (err) {}
  });
}

export default coremetrics;
