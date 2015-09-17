/**
 * @desc returnVisitor() Fires code when a user returns to an experiment
 *
 * @param {int} [optCookieName='ch-exp-last-visit'] - Name of the tracking cookie used to determine return visitors
 * @param {Function} [optCallback=null] - The code to execute if the user fits the criteria
 * @param {int} [optCutoff=1800] - Number of seconds since last visit to consider it a return visit
 * @param {bool} [optFirstTime=true] - Whether or not to run the code on the first visit
 * @param {int} [optCookieDays=365] - Number of days to bucket the user for
 *
 * @return {bool} - Whether the code was run or not
 */

import cookie from './cookie';

function returnVisitor(optCookieName = 'ch-exp-last-visit', optCallback = null, optCutoff = 1800, optFirstTime = true, optCookieDays = 365) {
  'use strict';

  let returnValue = false;

  const lastVisit = cookie.get(optCookieName);
  const timeStamp = Math.floor(Date.now()/1000);

  if((optFirstTime && !lastVisit) || (lastVisit && lastVisit < (timeStamp-optCutoff))) {
    if(optCallback !== null) {
      optCallback();
    }
    returnValue = true;
  }

  cookie.set(optCookieName, timeStamp, optCookieDays);

  return returnValue;
}

export default returnVisitor;
