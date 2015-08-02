/**
 * @desc debounce() prevents a function from being invoked repeatedly.
 * The function will be called again after it stops being called for N milliseconds.
 *
 * @param {Function} fn - the function to debounce
 * @param {Number} wait - rate limit in milliseconds
 * @param {Boolean} [leading=false] - if true, trigger fn on leading edge
 *
 * @return {Function} - the debounced function
 */
function debounce(fn, wait, leading = false) {
  let timeout;

  return (...args) => {
    function later() {
      timeout = null;
      if (!leading) fn(...args);
    }

    var callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn(...args);
  };
}

export default debounce;
