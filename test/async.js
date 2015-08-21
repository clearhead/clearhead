import chai, { assert, expect } from 'chai';
import { series, waterfall } from '../src/async';

describe('async', () => {

  describe('#series()', () => {
    it('should apply an iterator to a series of items in an array', (done) => {
      series([1, 2, 3, 4], (curr, next, prev = 0) => {
        setTimeout(() => {
          next(prev + curr);
        }, 0);
      }, (result) => {
        assert.equal(result, 10);
        done();
      });
    });
  });

  describe('#waterfall()', () => {
    it('should execute a series of functions asychronously', (done) => {
      waterfall([
        function start(next) {
          next(0);
        },
        function add2(running, next) {
          next(running + 2);
        },
      	function multiplyBy5(running, next) {
        	next(running * 5);
        },
        function(result) {
          assert.equal(result, 10);
          done();
        },
      ]);
    });
  });
});
