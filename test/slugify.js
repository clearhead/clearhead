import chai, { assert, expect } from 'chai';
import slugify from '../src/slugify';

describe('#slugify()', () => {

  it('should slugify a string', () => {
    assert.equal(slugify('test'), 'test');
    assert.equal(slugify('TeSt'), 'test');
    assert.equal(slugify('test a'), 'test-a');
    assert.equal(slugify('test_a'), 'test_a');
    assert.equal(slugify('test  a'), 'test-a');
    assert.equal(slugify('test a '), 'test-a');
    assert.equal(slugify(' test a '), 'test-a');
    assert.equal(slugify(' test !(a '), 'test-a');
    assert.equal(slugify('* test" !(a &'), 'test-a');
    assert.equal(slugify('test-a'), 'test-a');
    assert.equal(slugify('test--a'), 'test-a');
    assert.equal(slugify('test- a'), 'test-a');
    assert.equal(slugify('test - a'), 'test-a');
    assert.equal(slugify('test - -a'), 'test-a');
    assert.equal(slugify(123.45), '12345');
  });

});
