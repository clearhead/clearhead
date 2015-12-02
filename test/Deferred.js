import chai, { assert, expect } from 'chai';
import sinon, { spy } from 'sinon';
import Deferred from '../src/Deferred';

describe('Deferred', () => {

  const successHandler = spy();
  const failureHandler = spy();

  let dfd;
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  beforeEach(() => {
    successHandler.reset();
    failureHandler.reset();

    dfd = Deferred();
    dfd.promise().success(successHandler).fail(failureHandler);
  });

  after(() => {
    clock.restore();
  });

  describe('#promise()', () => {
    it('should return a promise', () => {
      const dfd = Deferred();
      const promise = dfd.promise();

      expect(promise).to.have.property('success');
      expect(promise).to.have.property('fail');
    });
  });

  describe('#resolve()', () => {
    it('should call the promise success handler once resolved', () => {
      sinon.assert.notCalled(successHandler);
      sinon.assert.notCalled(failureHandler);

      setTimeout(() => {
        dfd.resolve('success');
      }, 5000);

      clock.tick(1000);
      sinon.assert.notCalled(successHandler);
      sinon.assert.notCalled(failureHandler);

      clock.tick(4000);
      sinon.assert.called(successHandler);
      sinon.assert.notCalled(failureHandler);

      assert.equal(dfd._promise.data, 'success');
      assert.isTrue(dfd._promise.isResolved);
      assert.isUndefined(dfd._promise.isRejected);
    });
  });

  describe('#reject()', () => {
    it('should call the promise failure handler once rejected', () => {
      sinon.assert.notCalled(successHandler);
      sinon.assert.notCalled(failureHandler);

      setTimeout(() => {
        dfd.reject('failure');
      }, 5000);

      clock.tick(1000);
      sinon.assert.notCalled(successHandler);
      sinon.assert.notCalled(failureHandler);

      clock.tick(4000);
      sinon.assert.called(failureHandler);
      sinon.assert.notCalled(successHandler);

      assert.equal(dfd._promise.error, 'failure');
      assert.isTrue(dfd._promise.isRejected);
      assert.isUndefined(dfd._promise.isResolved);
    });
  });
});
