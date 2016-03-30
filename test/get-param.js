import chai, { assert, expect } from 'chai';
import getParam from '../src/get-param';

describe('#getParam()', function() {

  const url = 'https://www.optimizely.com/partners/solutions/clearhead/?name=test&title=foo+bar';

  it('should return the value of a key given a URL string with query parameters if that key exists in the query string', function() {
    const name = getParam('name', url);
  	assert.equal(name, 'test');
  });

   it('if the value of a given key contains a "+", it should be returned with the "+" replaced with a space', function() {
    const title = getParam('title', url);
  	assert.equal(title, 'foo bar');
  });

  it('should return an empty string if the given key is not present in the query string', function() {
  	const empty = getParam('empty', url);
    assert.equal(empty, '');
  });

});
