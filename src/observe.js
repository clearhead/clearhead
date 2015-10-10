/**
 * @desc observer() creates a mutation observer which disconnects after first mutation event
 *
 * @param {String} targetSelector - node selector to send
 * @param {Array} configArr - array of properties to set in observe()
 * @param {Object: Function} callback - function to be executed on observed mutations
 * @param {Boolean} oneShot - boolean which when true triggers disconnect on mutations (default: false)
 *
 * @return {MutationObserver} observer - returns configured observer
 */

import log from './log';

function observer(targetSelector, configArr, callback, oneShot = false ){
  // create target
  var target = document.querySelector(targetSelector);
  !target.length ? log('Target not found') : continue;
  // create observer constructor
  var Observer = window.MutationObserver || window.WebKitMutationObserver
  !Observer ? log('Observer constructor unavailable') : continue;
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

  // set up config object
  var arrayLimiter =[];
  var config = {};
  configArr.forEach(function(el, idx){
    // check if el is valid property
    if (checkForMatch(prop)) {
      // if el is an array, set to attributeFilter
      // if string set matching property to true
      // else log error and prevent further execution
      if (el.constructor === Array) {
        // only allow one array in configArr
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

  if (!config.mismatch && target.length) {
    var observer = new Observer(function() {
      /* Still thinking if this should be extended/changed */

      callBack();
      
      if (oneShot) {
        observer.disconnect();
      }
    });
    observer.observe(target, config);
  }

  return observer();
}

export default observer;
