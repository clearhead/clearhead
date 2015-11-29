import chai, { assert, expect } from 'chai';
import { series, waterfall } from '../src/async';
import activateExperiment from '../src/time-triggered-manual-activation';

describe('#activateExperiment()', () => {
	window.optimizely = [];

	it('should run an experiment whos start time is in the past', () => {
		assert.isTrue(activateExperiment(1445021756, 1111111111));
	});
	it('should not run an experiment whos start time is in the future', () => {
		assert.isFalse(activateExperiment(2147483600, 1111111111));
	});
	it('should not run an experiment whos start time is past the end of the unix epoch', () => {
		assert.isFalse(activateExperiment(2147483648, 1111111111));
	});
	it('should not run an experiment whos start time is before the beginning of the unix epoch', () => {
		assert.isFalse(activateExperiment(-1, 1111111111));
	});
	it('should not run an experiment with a bad ID number', () => {
		assert.isFalse(activateExperiment(1445021756, 111111111));
	});
	it('should be forgiving with semi-valid input', () => {
		assert.isTrue(activateExperiment('1445021756', '1111111111'));
	});
	it('should not run an experiment with invalid input', () => {
		assert.isFalse(activateExperiment({1: 1445021756}, 1111111111), 'An object is not a valid timestamp');
		assert.isFalse(activateExperiment(function(){}, 1111111111), 'A function is not a valid timestamp');
		assert.isFalse(activateExperiment(null, 1111111111), 'null is not a valid timestamp');
		assert.isFalse(activateExperiment(undefined, 1111111111), 'undefined is not a valid timestamp');
		assert.isFalse(activateExperiment(false, 1111111111), 'false is not a valid timestamp');
		assert.isFalse(activateExperiment(true, 1111111111), 'true is not a valid timestamp');
		assert.isFalse(activateExperiment('blah', 1111111111), 'A string is not a valid timestamp');
		assert.isFalse(activateExperiment(1111111111, {1: 1445021756}), 'An object is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, function(){}), 'A function is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, null), 'null is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, undefined), 'undefined is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, false), 'false is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, true), 'true is not a valid optimizely id');
		assert.isFalse(activateExperiment(1111111111, 'blah'), 'A string is not a valid optimizely id');
	});
});
