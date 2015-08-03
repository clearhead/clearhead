import chai, { assert, expect } from 'chai';
import sinon, { spy } from 'sinon';
import jqPoly from '../../../src/optimizely-jquery-polyfill';

const fn = [
  'offset',
  'position',
  'height',
  'width',
  'on',
  'off',
  'hide',
  'show',
];

const fx = [
  'fadeIn',
  'fadeOut',
];

describe('jQuery Polyfill', () => {
  let $test;
  let Ztest;
  let $msg;

  before(() => {
    fn.forEach((method) => delete window.jQuery.fn[method]);
    fx.forEach((method) => delete window.jQuery.fx[method]);

    jqPoly(window.jQuery);
  });

  beforeEach(() => {
    // replace with fresh copy to ensure inline styles and event listeners removed
    const test = document.createElement('div');
    test.className = 'test';

    const p = document.createElement('p');
    p.className = 'msg';
    p.textContent = 'This is a test';

    test.appendChild(p);

    document.body.innerHTML = '';
    document.body.appendChild(test);

    $test = window.jQuery('.test');
    Ztest = window.Zepto('.test');
    $msg = window.jQuery('.msg');
  });

  afterEach(() => {
    $test.css('display', 'block');
  });

  it('should polyfill the jQuery fn and fx objects', () => {
    expect(window.jQuery).to.have.property('chpoly')
      .that.deep.equals(true);
  });

  // -- fn methods ----------
  describe('fn methods', () => {

    describe('#offset()', () => {
      it('should return the top and left offset', () => {
        const { $top, $left } = $test.offset();
        const { Ztop, Zleft } = Ztest.offset();

        assert.equal($top, Ztop);
        assert.equal($left, Zleft);
      });
    });

    describe('#position()', () => {
      it('should return the top and left position', () => {
        const { $top, $left } = $test.position();
        const { Ztop, Zleft } = Ztest.position();

        assert.equal($top, Ztop);
        assert.equal($left, Zleft);
      });
    });

    describe('#height()', () => {
      it('should return the element height', () => {
        const height = $test.height();

        assert.equal(height, 500);
        assert.equal(height, Ztest.height());
      });
    });

    describe('#width()', () => {
      it('should return the element width', () => {
        const width = $test.width();

        assert.equal(width, 500);
        assert.equal(width, Ztest.width());
      });
    });

    describe('#on()', () => {
      it('should bind an event listener to the element', () => {
        const handler = spy();

        $test.on('mouseenter', handler);
        sinon.assert.notCalled(handler);

        $test.trigger('mouseenter');
        assert(handler.calledOnce);
      });

      it('should delegate an event listener', () => {
        const handler = spy();

        $test.on('click', '.msg', handler);
        sinon.assert.notCalled(handler);

        $msg.trigger('click');
        assert(handler.calledOnce);
      });
    });

    describe('#off()', () => {
      it('should remove an event listener from the element', () => {
        const mouseenterHandler = spy();
        const mouseleaveHandler = spy();
        const clickHandler = spy();
        const nsClickHandler = spy();

        $test
          .on('mouseenter', mouseenterHandler)
          .on('mouseleave', mouseleaveHandler)
          .on('click', clickHandler)
          .on('click.ns', nsClickHandler);

        $test.trigger('mouseenter');
        assert(mouseenterHandler.calledOnce);

        $test.trigger('click.ns');
        assert(nsClickHandler.calledOnce);
        sinon.assert.notCalled(clickHandler);

        $test.off('click.ns');
        $test.trigger('click');
        assert(clickHandler.calledOnce);
        assert(nsClickHandler.calledOnce);

        $test.off();
        $test.trigger('mouseleave');
        sinon.assert.notCalled(mouseleaveHandler);
      });
    });

    describe('#hide()', () => {
      it('should hide the element', () => {
        $test.hide();

        expect($test.css('display') === 'none');
      });
    });

    describe('#show()', () => {
      beforeEach(() => {
        $test.css('display', 'none');
      });

      it('should show the element', () => {
        expect($test.css('display') === 'none');

        $test.show();
        expect($test.css('display') === 'block');
      });
    });
  });

  // -- fx animation methods ----------
  describe('fx animation methods', () => {
    // sinon clock
    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    describe('#fadeIn()', () => {
      beforeEach(() => {
        $test.css('display', 'none');
      });

      it('should fade in the element', () => {
        expect($test.css('display') === 'none');

        $test.fadeIn(1000);
        expect($test.css('display') === 'block');

        clock.tick(500);
        expect(parseFloat($test.css('opacity'))).to.be.above(0);
        expect(parseFloat($test.css('opacity'))).to.be.below(1);

        clock.tick(500);
        expect(parseFloat($test.css('opacity'))).to.be.above(0.99);

        clock.tick(25);
        expect(parseFloat($test.css('opacity'))).to.equal(1);
      });
    });

    describe('#fadeOut()', () => {
      it('should show the element', () => {
        expect($test.css('display') === 'block');

        $test.fadeOut(1000);

        clock.tick(500);
        expect(parseFloat($test.css('opacity'))).to.be.above(0);
        expect(parseFloat($test.css('opacity'))).to.be.below(1);

        clock.tick(500);
        expect(parseFloat($test.css('opacity'))).to.be.below(0.01);

        clock.tick(25);
        expect($test.css('display') === 'none');
      });
    });
  });
});
