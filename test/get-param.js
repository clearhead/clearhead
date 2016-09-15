import chai, { assert, expect } from 'chai';
import getParam from '../src/get-param';

describe('#getParam()', () => {

	it('Find an animal in a query string', () => {
		var search = "?utf8=%E2%9C%93&animals=otters";
		assert.equal(getParam('animals', search), 'otters', "Found the otter.");
		assert.notEqual(getParam('Animals', search), 'otters', "Key is capitalized.");
		assert.notEqual(getParam('animals', search), 'Otters', "Param value is capitalized.");
		assert.notEqual(getParam('Animals', search), 'Otters', "Key and Param value is capitalized.");
		assert.notEqual(getParam('animals', search), 'kitty', "Param value is wrong.");
	});

	it('Find animals in a query string', () => {
		var search = "?utf8=%E2%9C%93&animals=otters+dogs";
		assert.equal(getParam('animals', search), 'otters dogs', "Found the otter and dog.");
		assert.notEqual(getParam('animals', search), 'otters+dogs', "Test will parse out the string concat.");
		assert.notEqual(getParam('Animals', search), 'otters dogs', "Key is capitalized.");
		assert.notEqual(getParam('animals', search), 'Otters dogs', "Param value is capitalized.");
		assert.notEqual(getParam('Animals', search), 'Otters dogs', "Key and Param value is capitalized.");
		assert.notEqual(getParam('animals', search), 'kitty dogs', "Param value is wrong.");
	});

});

// TODO: https://github.com/clearhead/optimizely-snippets/blob/master/tests/GetParamSpec.js
// describe('experiment/get-param.js', function() {
//   it('can get params', function() {
//     expect(window.clearhead.getParam('p', '?p=v')).toBe('v');
//   });
// });
