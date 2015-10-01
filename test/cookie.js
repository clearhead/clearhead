import chai, { assert, expect } from 'chai';
import cookie from '../src/cookie';

describe('#cookie()', () => {

  const cookieIn = 1;
  const cookieName = 'testcookie';
  cookie.set(cookieName, cookieIn);

  it('should set and get a cookie', () => {
    const cookieOut = cookie.get(cookieName);
    assert.equal(cookieIn, cookieOut);
  });

  it('should delete a cookie', () => {
    cookie.del(cookieName);
    const cookieOut = cookie.get(cookieName);
    should.not.exist(cookieOut);
  });

});
