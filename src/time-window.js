/**
 * @desc timeWindow() Runs a supplied callback only between the specified start and end times
 * To use a trusted server time instead of relying on the client time, try passing the response from http://i.clrhd.me/timestamp as the currentTime parameter
 * You should be able to get the server time using something along the lines of: window.jQuery.get('http://107.170.199.159/timestamp').done(function(data){var serverTime = data;});
 *
 * @param {int|string} startTime - A UTC timestamp(in seconds|miliseconds -- 10|13 digit int), or a RFC2822 or ISO 8601 date(like: December 2, 2015, 12:01:00 EST) after which the callback should be run
 * @param {int|string} endTime - A UTC timestamp(in seconds|miliseconds -- 10|13 digit int), or a RFC2822 or ISO 8601 date(like: December 2, 2015, 12:01:00 EST) after which the callback should no longer be run
 * @param {function} callback - The function to be exectued if the current time is between the start and end times
 * @param {int|string} currentTime - A UTC timestamp(in seconds|miliseconds -- 10|13 digit int), or a RFC2822 or ISO 8601 date(like: December 2, 2015, 12:01:00 EST) to be used instead of the real current time (can also be passed as a query parameter on a page with this code)
 *
 * @return {bool} - Whether the callback was run or not
 */

import getParam from './get-param';

function timeWindow(startTime, endTime, callback, currentTime = null) {

	if(typeof startTime === 'string') {
		if(startTime.length === 10 || startTime.length === 13) {
			startTime = parseInt(startTime);
		}
		else {
			startTime = Date.parse(startTime);
		}

		if(isNaN(startTime)) {
			console.log('We couldn\'t convert your start time('+startTime+') into a timestamp. Please make sure it follows the fallowing format: December 2, 2015, 12:01:00 EST');
			return false;
		}
	}
	if(typeof startTime !== 'number' || (startTime.toString().length !== 10 && startTime.toString().length !== 13)) {
		console.log('Start time invalid. It needs to be an integer of either 10 or 13 digits. You supplied: '+startTime);
		return false;
	}

	if(typeof endTime === 'string') {
		if(endTime.length === 10 || endTime.length === 13) {
			endTime = parseInt(endTime);
		}
		else {
			endTime = Date.parse(endTime);
		}

		if(isNaN(endTime)) {
			console.log('We couldn\'t convert your end time('+endTime+') into a timestamp. Please make sure it follows the fallowing format: December 2, 2015, 12:01:00 EST');
			return false;
		}
	}
	if(typeof endTime !== 'number' || (endTime.toString().length !== 10 && endTime.toString().length !== 13)) {
		console.log('End time invalid. It needs to be an integer of either 10 or 13 digits. You supplied: '+endTime);
		return false;
	}

	if(startTime > endTime) {
		console.log('You supplied a start time which is *after* the end time you supplied. You may want to check those.');
	}

	if(startTime.toString().length !== endTime.toString().length) {
		console.log('The length of your start and end timestamps ('+startTime.toString().length+' & '+endTime.toString().length+' respectively) don\'t match, which can cause unexpected results.');
	}

	//This block allows you to test how this code would work at different times by using a query parameter
	if(currentTime === null) {
		currentTime = getParam('currentTime');
		if(currentTime === '') {
			currentTime = new Date().getTime();

			if(startTime.toString().length === 10) {
				currentTime = parseInt(currentTime.toString().substr(0, 10));
				//This medthod above is safer than Math.round((new Date()).getTime() / 1000) because it doesn't matter if the browser returns the miliseconds with the timestamp or not
			}
		}
	}

	if(typeof currentTime === 'string' && (currentTime.toString().length !== 10 && currentTime.toString().length !== 13)) {
		currentTime = Date.parse(currentTime);

		if(isNaN(currentTime)) {
			console.log('We couldn\'t convert your current time('+currentTime+') into a timestamp. Please make sure it follows the fallowing format: December 2, 2015, 12:01:00 EST');
		}
	}
	else if(typeof currentTime === 'string' && (currentTime.toString().length === 10 || currentTime.toString().length === 13)) {
		currentTime = parseInt(currentTime);
	}

	if(typeof currentTime !== 'number' || (currentTime.toString().length !== 10 && currentTime.toString().length !== 13)) {
		console.log('Current Time time invalid. It needs to be an integer of either 10 or 13 digits. You supplied '+currentTime);
		return false;
	}

	if((startTime.toString().length === 10 && startTime > 2147483647) || startTime > 2147483647000 || startTime < 0 || (endTime.toString().length === 10 && endTime > 2147483647) || startTime > 2147483647000 || endTime < 0) {
		console.log('You are way outta bounds here. The start/end time you supplied either exceedes the maximum or minimum possible');
		return false;
	}

	if(startTime.toString().length !== endTime.toString().length || startTime.toString().length !== currentTime.toString().length) {
    startTime = parseInt(startTime.toString().substr(0, 10));
    endTime = parseInt(endTime.toString().substr(0, 10));
    currentTime = parseInt(currentTime.toString().substr(0, 10));
  }

	if(currentTime >= startTime && currentTime < endTime) {
		var context, args;
		callback.apply(context, args);
		return true;
	}

	return false;
}

export default timeWindow;
