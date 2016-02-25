import chai, { assert, expect } from 'chai';
import dollarToFloat from '../src/dollar-to-float';

describe('#dollarToFloat()', () => {

  it('should convert a money string into a number', () => {
    assert.equal(dollarToFloat('$100.00'), 100);
    assert.equal(dollarToFloat('100.00'), 100);
    assert.equal(dollarToFloat('$100'), 100);
    assert.equal(dollarToFloat('100'), 100);
    assert.equal(dollarToFloat('0'), 0);
    assert.equal(dollarToFloat('$0'), 0);
    assert.equal(dollarToFloat('$0.00'), 0);
    assert.equal(dollarToFloat('$100.10'), 100.1);
    assert.equal(dollarToFloat('$.10'), .1);
    assert.equal(dollarToFloat('.1'), .1);
  });

});
