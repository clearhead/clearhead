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
      var e = experimentId;

      // DO NOT EDIT BELOW THIS LINE
      var o = window.optimizely,
        v = o.data.variations,
        vId = o.variationIdsMap[e],
        vIndex = o.variationMap[e];

      var isMvt = vId.length > 1,
        eName = o.data.experiments[e].name;

      var cmKey = (isMvt ? 'MVT' : 'AB') + ' Test: ' + eName + '';
      var cmValue, i;

      if (!isMvt) {
        var isControl = o.variationMap[e] === 0;
        cmValue = isControl ? 'Control' : 'V' + vIndex.toString() + ': ' + o.variationNamesMap[e];
      } else {
        var valueArray = [],
          s = o.data.sections,
          sId = o.data.experiments[e].section_ids;
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
