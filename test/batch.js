import chai, { assert, expect } from 'chai';
import batch from '../src/batch';

describe('#batch()', () => {

  it('should batch an array into smaller arrays of length n', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const batches = batch(arr, 2);
    const [, , , seven] = batches;

    assert.equal(batches.length, 4);
    batches.map((a) => expect(a).to.be.an.instanceof(Array));

    expect(batches).to.have.deep.property('[1]')
      .that.is.an('array')
      .with.deep.property('[1]')
        .that.deep.equals(4);

    expect(seven).to.have.length(1)
      .with.deep.property('[0]')
        .that.deep.equals(7);
  });
});
