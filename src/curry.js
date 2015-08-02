/**
 * @desc curry() returns a curried function that will
 * not be called until all arguments received.
 *
 * @param {Function} fn - the function to curry
 * @param {Number} [len] - specifies the number of arguments needed to call the function
 *
 * @return {Function} - the curried function
 */
function curry(fn, len) {
 const fnlen = len || fn.length;

 return function wait(...args) {
   if (args.length >= fnlen) return fn(...args);
   return wait.bind(null, ...args);
 };
}

export default curry;
