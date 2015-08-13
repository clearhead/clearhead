

import log from './log';
import notify from './notify';

let TRACK = false;

export default {
  enable(){ TRACK = true; },
  goal(category, action, label) {
    // auto sniff globals and fire into any that exist
    if (!TRACK) return log('goal:', ...Array.from(arguments));


  },
  bucket(experimentId) {
    // combine cm.js, ga.js, ua.js, gtm.js
    if (!TRACK) return log('bucketing:', ...Array.from(arguments));
  }
}
