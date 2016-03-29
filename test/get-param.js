import chai, { assert, expect } from 'chai';
import getParam from '../src/get-param';

describe('#getParam()', function() {

	it('should exist', function() {
		expect(getParam).not.to.be.undefined;
	})

  it('should return the value of a key given a URL string with query parameters', function() {
  	assert.equal(getParam('name', '?name=test'), 'test');
  	assert.equal(getParam('name', '?name=[t3$ting]'), '[t3$ting]');
  	assert.equal(getParam('name', '?name=test+test'), 'test test');
  });

});
