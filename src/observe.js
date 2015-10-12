/**
 * @desc observer() creates a mutation observer which disconnects after first mutation event
 *
 * @param {String} targetSelector - node selector to send
 * @param {Array} configArr - array of properties to set in observe()
 * @param {Object: Function} callback - function to be executed on observed mutations
 *
 * @return {MutationObserver} observer - returns configured observer
 */

import log from './log';

function observer(targetSelector, configArr, callback){
  // create target
  var target = document.querySelector(targetSelector);
  if (!target) log('Target not found');
  // create observer constructor
  var Observer = window.MutationObserver || window.WebKitMutationObserver
  if (!Observer) log('Observer constructor unavailable'); // necessary?

  // function return whether arg in configArr is accepted
  function checkForMatch(prop) {
    var index = ['childList',
                'attributes',
                'characterData',
                'subtree',
                'attributeOldValue',
                'characterDataOldValue',
                'attributeFilter'].indexOf(prop);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  var arrayLimiter = []; // array to prevent 2 arrays in configArr

  // check for match,
  var config = {};
  configArr.forEach(function(el, idx){
    if (checkForMatch(el)) {
      if (el.constructor === Array) {
        if (arrayLimiter.length < 2) {
          once.push(el);
          config.attributeFilter = el;
        } else {
          log('Only one array accepted in configArr parameter');
        }
      } else if (el.constructor === String) {
        config[el] = true;
      } else {
        log('Parameter of incorrect type: ' + el)
        config.mismatch = true;
      }
    } else {
      log('Unrecognized property: ' + el);
      config.mismatch = true;
    }
  });

  // if config setup was valid/successful
  // create observer
  if (!config.mismatch && target) {
    var observer = new Observer(callback); // access MutationRecord with 'this' in callback
    observer.observe(target, config);
  }

  return observer;
}

export default observer;
