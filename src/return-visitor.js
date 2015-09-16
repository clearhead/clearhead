/**
 * @desc returnVisitor() Fires code when a user returns to an experiment
 *
 * @param {Function} callback - The code to execute if the user fits the criteria
 * @param {int} cutoff - Number of seconds since last visit to consider it a return visit
 * @param {bool} [optFirstTime=true] - Whether or not to run the code on the first visit
 *
 * @return {bool} - Whether the code was run or not
 */

import cookie from './cookie';

function returnVisitor(callback, cutoff, optFirstTime = true) {
  'use strict';

  let returnValue = false;

  if((optFirstTime && !cookie.get('ch-exp-last-visit')) || (cookie.get('ch-exp-last-visit') && cookie.get('ch-exp-last-visit') < (Math.floor(Date.now()/1000)-cutoff))) {
    callback.call();
    returnValue = true;
  }

  cookie.set('ch-exp-last-visit', Math.floor(Date.now()/1000), 365);

  return returnValue;
}

export default returnVisitor;
