/*jshint strict: false */

/**
 * @desc throttle() - turns dollar format string into a "mathable" float
 *
 * @param {String} dollarString - the dollar string to be turned into
 *
 * @return {Number} - float version of the dollarString param
 */

function dollarToFloat(dollarString) {
  var dollarFloat = parseFloat( dollarString.replace(/[\$,]/g,'') );
  return dollarFloat;
}

export default dollarToFloat;