import chai, { assert, expect } from 'chai';
import getParam from '../src/get-param';

describe('#getParam()', function() {

  const url = ;

  // it('should return the value of a key given a URL string with query parameters', function() {
  // 	assert.equal(getParam('name', '?name=test'), 'test');
  // 	assert.equal(getParam('name', '?name=[t3$ting]'), '[t3$ting]');
  // 	assert.equal(getParam('name', '?name=test+test'), 'test test');
  // });

  it('should return the value of a key given a URL string with query parameters if that key exists in the query string', function() {

    const name = getParam('name', url);
  	assert.equal(name, 'test');
  });

  it('should return an empty string if the given key is not present in the query string', function() {
  	const empty = getParam('empty', url);
    assert.equal(empty, '');
  });

});
