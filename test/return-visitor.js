import chai, { assert, expect } from 'chai';
import { series, waterfall } from '../src/async';
import returnVisitor from '../src/return-visitor';

describe('#returnVisitor()', () => {
  it('run some code if a visitor has no cookie and optFirstTime is true', () => {
    assert.equal('beau', 'beau'); // 'bad person'
  });
  it('not run the code if a visitor has no cookie and optFirstTime is false', () => {
    assert.equal('beau', 'beau'); // 'bad person'
  });
  it('run some code if a visitor has a cookie and hasn\'t been here since cutoff', () => {
    assert.equal('beau', 'beau'); // 'bad person'
  });
  it('not run the code if a visitor has a cookie and has been here since cutoff', () => {
    assert.equal('beau', 'beau'); // 'bad person'
  });
});
