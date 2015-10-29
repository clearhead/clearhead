/**
 * @desc monetateLoaded() Runs your code exactly once after the client jQuery has finished loaded
 *
 * @param {function} callback - A block of code to be executed once jQuery loads
 *
 * @return {bool} - Whether the code was run or not
 */

function monetateLoaded(callback) {
	'use strict';

	//Return a unique but reproducable string out of a much longer string
	function hashCode(stringToHash) {
		var hash = 0, i, chr, len;
		if (stringToHash.length == 0) return hash;
		for (i = 0, len = stringToHash.length; i < len; i++) {
			chr = stringToHash.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash.toString();
	};

	var pollTimeout = null;

	function pollForjQuery() {
		//Use the client jQuery
		var $ = window.jQuery;

		//If jQuery isn't fully loaded yet
		if (!$ || !$.fn || !$.fn.jquery) {
			//Exit this function and check again in 50milliseconds
			return false;
		}

		//Generate a unique class name from the code to be run in order to make sure we don't run the code twice
		var uniqueClass = hashCode(callback.toString());

		//If we've already run this experiment
		if ($('body').hasClass(uniqueClass)) {
			//Stop the loop from checking again
			clearInterval(pollTimeout);

			//Exit this function
			return false;
		}

		//Stop checking to see if the conditions are met
		clearInterval(pollTimeout);

		//Add our unique class to the body so we can make sure we don't run this code again
		$('body').addClass(uniqueClass);

		//Run our code finally!
		callback();

		return true;
	}

	//Start looking for jQuery every 50milliseconds
	pollTimeout = setInterval(pollForjQuery, 50);
}

export default monetateLoaded;
