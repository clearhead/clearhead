import chai, { assert, expect } from 'chai';
import curry from '../src/curry';

describe('#curry()', () => {

  it('should return a function', () => {
    const curried = curry(() => {});
    expect(curried).to.be.a('function');
  });

  it('should call the curried function only once all arguments received', () => {
    const reverse = curry((a, b, c) => {
      return `${c} ${b} ${a}`;
    });

    const partial = reverse('a', 'b');

    expect(partial).to.be.a('function');
    assert.equal(partial('c'), 'c b a');
  });

  it('should accept an argument length', () => {
    // sum must receive at least 2 arguments before being called
    const sum = curry((...args) => {
      return args.reduce((prev, curr) => prev + curr);
    }, 2);

    expect(sum(1)).to.be.a('function');
    assert.equal(sum(1, 2), 3);
    assert.equal(sum(1, 2, 3), 6);
    assert.equal(sum(1)(2, 3, 4), 10);
    assert.equal(sum()(1)(2, 3, 4, 5), 15);
  });
});
