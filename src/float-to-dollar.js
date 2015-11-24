/*jshint strict: false */

/**
 * @desc floatToDollar() - turns floats into a dollar format string with commas
 *
 * @param {Number} float - the number to be turned into a '$' with commas
 *
 * @return {String} - string beginning with a dollar sign and ending with two 
 *										decimal points for cents
 */
function floatToDollar(num) {
  var dolString = '$' + (num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  return dolString;
}

export default floatToDollar;