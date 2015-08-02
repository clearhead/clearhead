import chai, { assert, expect } from 'chai';
import jqPoly from '../src/jquery-polyfill';

describe('jQuery Polyfill', () => {

  it('should polyfill the jQuery fn and fx objects', () => {
    const $ = { fn: {}, fx: {} };

    jqPoly($);

    expect($).to.have.property('chpoly')
      .that.deep.equals(true);

    expect($.fn).to.have.property('hide')
      .that.is.a('function');
    expect($.fx).to.have.property('fadeIn')
      .that.is.a('function');
  });

  it('should not apply polyfill more than once', () => {
    const $ = { fn: {}, fx: {} };

    jqPoly($);

    expect($).to.have.property('chpoly')
      .that.deep.equals(true);
    expect($.fn).to.have.property('hide')
      .that.is.a('function');

    // remove hide (but not $.chpoly)
    delete $.fn.hide;
    jqPoly($);

    // hide should not be reapplied
    expect($.fn).to.not.have.property('hide');
  });

  it('should add animations to fn object if fx object not available', () => {
    const $ = { fn: {} };

    jqPoly($);

    expect($).to.have.property('chpoly')
      .that.deep.equals(true);
    expect($).to.not.have.property('fx');

    expect($.fn).to.have.property('fadeIn')
      .that.is.a('function');
  });
});
