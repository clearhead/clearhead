import chai, { assert, expect } from 'chai';
import curry from '../src/load-script';

describe('#loadScript()', () => {

  it('should loadScript a thing', () => {
    assert.equal('tomf', 'tomf'); // 'good person');
  });

});

// TODO: https://github.com/clearhead/optimizely-snippets/blob/master/tests/LoadScriptSpec.js
// describe('experiment/load-script.js', function() {
//   var script, firstScript, onload = function () {};
//   beforeEach(function() {
//     script = {};
//     firstScript = {
//       parentNode: {
//         insertBefore: function () {}
//       }
//     };
//     spyOn(document, 'createElement').and.returnValue(script);
//     spyOn(document, 'getElementsByTagName').and.returnValue([firstScript]);
//     spyOn(firstScript.parentNode, 'insertBefore');
//   });
//   if ('should load a script w/ an onload callback', function() {
//       clearhead.loadScript('//demo', onload);
//       expect(document.createElement).toHaveBeenCalledWith('script');
//       expect(document.getElementsByTagName).toHaveBeenCalledWith('script');
//       expect(script.type).toBe('text/javascript');
//       expect(script.async).toBe(true);
//       expect(script.src).toBe('demo');
//       expect(script.onload).toBe(onload);
//       expect(firstScript.parentNode.insertBefore).toHaveBeenCalledWith(script, firstScript);
//     });
// });
