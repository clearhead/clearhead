/*jshint strict: false */

/**
 * @desc sumDollars() - takes an infinite number of dollar strings 
 *											ex: '$499.99' and adds them together
 *											
 *
 * @param {String or jQuery obj} prices - dollar strings to be added
 *                      ex:'$100.00', '$200.00'
 *                        or
 *                      $('.prices');
 *                          
 *
 * @return {String} - string beginning with a dollar sign and ending with two 
 *										decimal points for cents
 */
 import dollarToFloat from './dollar-to-float';
 import floatToDollar from './float-to-dollar';

function sumDollars(prices) {
  // if passed jQuery array
  if (typeof prices === 'object') {
    var total = 0;
    prices.each(function() {
      total += dollarToFloat($(this).text());
    });
    return floatToDollar(total);
  }
  // if passed string
  else {
    var args = Array.prototype.slice.call(prices);
    var floatSum = args.reduce(function(previousValue, currentValue) {
      return dollarToFloat(previousValue) + dollarToFloat(currentValue);
    });
    return floatToDollar(floatSum);
  }
}

export default sumDollars;