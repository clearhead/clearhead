/**
 * @desc activateExperiment() Activates an Optimizely experiment after a specified time
 *
 * Because javascript always returns a UTC timestamp (not your local time), to get a launch time use any online timestamp calculator to get the UTC timestamp for when you want the test to launch,
 * then subtract the UTC offset of the timezone where it will be launching, times 3600 (the number of seconds in an hour).
 *
 * Here are some examples:
 *
 * CST (daylight savings -6): timestamp + 21600
 * CDT (daylight savings: -5): timestamp + 18000
 * PST (daylight savings -8): timestamp + 28800
 * PDT (daylight savings: -7): timestamp + 25200
 *
 * So if you wanted a test to start Friday, October 16th, 2015 at 10:00 pm CST, you'd find the UTC timestamp for that, which is 1445032800 then add 18000 to get to 1445050800
 *
 * @param {int} launchTime - A UTC timestamp(in seconds -- 10 digit int) after which point the experiment should always be triggered
 * @param {int} experimentOptimizelyID - The Optimizely ID (10 digit int) of the actual experiment where the variation code lives
 * @param {int} [activationOptimizelyID=null] - The Optimizely ID (10 digit int) of the 100% experiment where this code will run. Only necessary to make previewing easy
 *
 * @return {bool} - Whether the experiment was activated or not
 */

import cookie from './cookie';

function activateExperiment(launchTime, experimentOptimizelyID, activationOptimizelyID = null) {

	//Make sure everything is an integer
	launchTime = parseInt(launchTime);
	experimentOptimizelyID = parseInt(experimentOptimizelyID);

	//Sanity check the launchTime
	if(launchTime.toString().length !== 10) {
		console.log('Hrmmmm, the launchTime doesn\'t appear to be a valid timestamp in seconds, which are usually 10 digit integers');
	}
	if(launchTime > 2147483647 || launchTime < 0) {
		console.log('You are way outta bounds here. The launch time you supplied either exceedes the maximum or minimum possible');
		return false;
	}

	//Sanity check the experimentOptimizelyID
	if(experimentOptimizelyID.toString().length !== 10) {
		console.log('Your experimentOptimizelyID isn\'t ten digits long, but it should be...');
		return false;
	}

	//UTC timestamp in seconds
	let currentTime = parseInt(new Date().getTime().toString().substr(0, 10));
	//This medthod above is safer than Math.round((new Date()).getTime() / 1000) because it doesn't matter if the browser returns the miliseconds with the timestamp or not

	if(currentTime > launchTime || location.search.indexOf('?optimizely_x'+experimentOptimizelyID) > -1 || (activationOptimizelyID !== null && location.search.indexOf('?optimizely_x'+activationOptimizelyID) > -1) || (cookie.get('optimizelyBuckets') && (cookie.get('optimizelyBuckets').indexOf(experimentOptimizelyID) > -1 || (activationOptimizelyID !== null && cookie.get('optimizelyBuckets').indexOf(activationOptimizelyID) > -1)))) {
		window.optimizely.push(['activate', experimentOptimizelyID]);
		return true;
	}

	return false;
}

export default activateExperiment;
