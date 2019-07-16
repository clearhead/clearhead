import chai, { expect, assert } from 'chai';
import phoneCheck from '../src/phone-check.js';

describe('Phone Check: ', () => {

  it('Should return true for a valid phone number.', () => {
      var user_phone = "5126267616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number after stripping dashes.', () => {
      var user_phone = "512-626-7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number after stripping spaces.', () => {
      var user_phone = "512 626 7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number after parentheses.', () => {
      var user_phone = "(512) 626 7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number after dots.', () => {
      var user_phone = "512.626.7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number, Combo breaker!.', () => {
      var user_phone = "(512) 626-7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number, crazy A spaces', () => {
      var user_phone = "A512A626A7616";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return true for a valid phone number, escaped chars.', () => {
      var user_phone = "(512)\s626\s761\b6";

      assert.equal(phoneCheck(user_phone), true);
  });

  it('Should return false for a phone number with URL encoded spaces.', () => {
      var user_phone = "512%20626%207616";

      assert.equal(phoneCheck(user_phone), false);
  });

  it('Should return false for a phone number with country code.', () => {
      var user_phone = "15126267616";

      assert.equal(phoneCheck(user_phone), false);
  });

  it('Should return false for a phone number without area code. (Too Short.)', () => {
      var user_phone = "6267616";

      assert.equal(phoneCheck(user_phone), false);
  });



});
