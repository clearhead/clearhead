import chai, { assert, expect } from 'chai';
import floatToDollar from '../src/float-to-dollar';

describe('#floatToDollar()', () => {

  it('should convert a number into a money string', () => {
    assert.equal(floatToDollar(100), '$100.00');
    assert.equal(floatToDollar(100.1), '$100.10');
    assert.equal(floatToDollar(.1), '$0.10');
    assert.equal(floatToDollar(-100), '$-100.00');
    assert.equal(floatToDollar(1.999), '$2.00');
    assert.equal(floatToDollar(1.001), '$1.00');
    assert.equal(floatToDollar(1.005), '$1.00');
    assert.equal(floatToDollar(1.006), '$1.01');
  });

});
