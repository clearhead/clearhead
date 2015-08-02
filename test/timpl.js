import chai, { assert, expect } from 'chai';
import timpl from '../src/timpl';

describe('#timpl()', () => {

  it('should compile a template string with data', () => {
    const template = 'The {{ el }} is {{ dims.width }}px by {{ dims.height }}px.';
    const data = {
      el: 'CTA',
      dims: { width: 200, height: 50 },
    };

    const actual = timpl(template, data);
    const expected = 'The CTA is 200px by 50px.';

    assert.equal(actual, expected);
  });
});
