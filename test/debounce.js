import chai, { assert, expect } from 'chai';
import sinon, { spy } from 'sinon';
import debounce from '../src/debounce';

describe('#debounce()', () => {
  // callback spy
  const callback = spy();

  // sinon clock
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  afterEach(() => {
    callback.reset();
  });

  it('should call the debounced function only once per wait period', () => {
    const debounced = debounce(callback, 1000, true);

    // call debounced function 3 times in a row
    debounced(); debounced(); debounced();
    assert(callback.calledOnce);

    // call debounced again after 1s
    clock.tick(1000);
    debounced();
    assert(callback.calledTwice);
  });

  it('should call leading edge callbacks immediately', () => {
    const leading = debounce(callback, 1000, true);

    leading();
    sinon.assert.called(callback);
  });

  it('should call trailing edge callbacks after wait period', () => {
    const trailing = debounce(callback, 1000);

    trailing();
    sinon.assert.notCalled(callback);
    clock.tick(1000);
    sinon.assert.called(callback);
  });
});
