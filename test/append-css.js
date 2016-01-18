import chai, { assert, expect } from 'chai';
import phantom from 'phantomjs'
import appendCss from '../src/append-css';
  
describe('#appendCss()', () => {
  var css = '* {color: red;}';
  assert.typeOf(css, 'string');
  // TO DO: test
});
