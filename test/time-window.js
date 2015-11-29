import chai, { assert } from 'chai';
// import { series, waterfall } from '../src/async';
import timeWindow from '../src/time-window';

describe('#timeWindow()', () => {

	var callback = function(){
		console.log('Callback successfully called!');
	};

	it('should run an experiment whos start time is in the past, and end time in the future', () => {
		assert.isTrue(timeWindow(1445021756, 2147483647, callback));
	});
	it('should run an experiment whos start time is in the past, and end time in the future, even if the times are in miliseconds', () => {
		assert.isTrue(timeWindow(1445021756000, 2147483647000, callback));
	});
	it('should run an experiment whos start time and end time are in the past, if we spoof the current time correctly', () => {
		assert.isTrue(timeWindow(2147200000, 2147400000, callback, 2147300000))
	});
	it('should not run an experiment whos end time is in the past', () => {
		assert.isFalse(timeWindow(1445021756, 1446021756, callback));
	});
	it('should run an experiment whos start time is in the past, and end time in the future, using strings for input', () => {
		assert.isTrue(timeWindow('January 1, 2015, 12:01:00 CST', 'January 18, 2038, 23:59:59 UTC', callback));
	});
	it('should run an experiment whos start time and end time are in the past, if we spoof the current time correctly', () => {
		assert.isTrue(timeWindow('January 1, 2015, 12:01:00 CST', 'January 18, 2038, 23:59:59 UTC', callback, 'June 22, 2016, 6:22:00 CST'));
	});
	it('should not run an experiment whos start time is past the end of the unix epoch', () => {
		assert.isFalse(timeWindow(2147483648, 1111111111, callback));
	});
	it('should not run an experiment whos start time is before the beginning of the unix epoch', () => {
		assert.isFalse(timeWindow(-1, 1111111111, callback));
	});
	it('should be forgiving with semi-valid input', () => {
		assert.isTrue(timeWindow('1445021756', '2147483647', callback));
	});
	it('should not run an experiment with invalid input', () => {
		assert.isFalse(timeWindow({1: 1445021756}, 1111111111, callback), 'An object is not a valid timestamp');
		assert.isFalse(timeWindow(function(){}, 1111111111, callback), 'A function is not a valid timestamp');
		assert.isFalse(timeWindow(null, 1111111111, callback), 'null is not a valid timestamp');
		assert.isFalse(timeWindow(undefined, 1111111111, callback), 'undefined is not a valid timestamp');
		assert.isFalse(timeWindow(false, 1111111111, callback), 'false is not a valid timestamp');
		assert.isFalse(timeWindow(true, 1111111111, callback), 'true is not a valid timestamp');
		assert.isFalse(timeWindow('blah', 1111111111, callback), 'A string is not a valid timestamp');
		assert.isFalse(timeWindow(1111111111, {1: 1445021756}, callback), 'An object is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, function(){}, callback), 'A function is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, null, callback), 'null is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, undefined, callback), 'undefined is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, false, callback), 'false is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, true, callback), 'true is not a valid optimizely id');
		assert.isFalse(timeWindow(1111111111, 'blah', callback), 'A string is not a valid optimizely id');
	});
});
