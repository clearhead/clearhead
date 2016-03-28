import chai, { assert, expect } from 'chai';
import phantom from 'phantomjs'
import appendCss from '../src/append-css';

describe('#appendCss()', () => {
  const css = 'body {color: red;}';
  assert.typeOf(css, 'string');
  appendCss(css);

  setTimeout(function() {
    it('has the right color', function () {
      const color = window.getComputedStyle(document.getElementsByTagName('body')[0],null).getPropertyValue('color');
      assert.equal(color, 'rgb(255, 0, 0)');
    });
  }, 100);
});
