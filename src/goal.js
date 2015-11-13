/**
 * @desc goal() fires strings into auto detected analytics installs
 *
 * @param {str}
 *
 * @return {void}
 *
 * usage:
 *   const goal = require('clearhead/goal').bind(null, 'exp1-foo');
 *   goal('click', '#bar'); ==>
 *   // optimizely.push(['trackEvent', 'exp1-foo-click-#bar'])
 *   // monetateQ.push(['trackEvent', ['exp1-foo-click-#bar']])
 *   // s.tl() // won't fire b/c !/^(prop|evar)/i.test(args[0])
 *   // dataLayer.push({event:'clearhead.goal', meta:{category, action, label}})
 *   // ga('send', 'event', 'exp1-foo', 'click', '#bar')
 *   // _gaq.push(['_trackEvent', 'exp1-foo', 'click', '#bar']);
 *
 *   const goal = require('goal').bind(null, 'prop46');
 *   goal('exp1-foo', 'clicked-header'); ==>
 *   // optimizely.push(['trackEvent', 'prop46-exp1-foo-clicked-header'])
 *   // monetateQ.push(['trackEvent', ['prop46-exp1-foo-clicked-header']])
 *   // require('clearhead/track')('prop46', 'exp1-foo-clicked-header');
 *
 */
import track from './track';
const log = require('./log').bind(null, 'clearhead/goal:');
const dataLayerTrigger = require('./deps/datalayer-trigger')();

function goal(category, ...args /*option, label*/ ) {
  'use strict';

  const lowercaseSlug = [category, ...args].join('-').toLowerCase();

  // optimizely goals first
  if (window.optimizely && !!window.optimizely.push) {
    log('optimizely', lowercaseSlug);
    window.optimizely.push(['trackEvent', lowercaseSlug]);
  }

  // monetateQ - lots of arrays but it's correct
  if (window.monetateQ && !!window.monetateQ.push) {
    log('monetateQ', lowercaseSlug);
    window.monetateQ.push(['trackEvent', [lowercaseSlug]]);
  }

  // omniture
  if (/^(prop|evar)/i.test(category) && window.s && !!window.s.tl) {
    let fire = [...args].join('-');
    log('s.tl', category, fire);
    track(category, fire);
    return;
  }

  // google tag manager > ga > _gaq
  if (!!window.dataLayer && !!window.dataLayer.push) {
    let push = {
      event: dataLayerTrigger,
      meta: {
        category, action: args[0], label: args[1],
      },
    };
    log('dataLayer.push', push);
    window.dataLayer.push(push);
  } else if (typeof window.ga === 'function') {
    log('ga', category, ...args);
    window.ga('send', 'event', category, ...args);
  } else if (!!window._gaq && !!window._gaq.push) {
    log('_gaq', category, ...args);
    window._gaq.push(['_trackEvent', category, ...args]);
  }

  // intentional leave coremetrics out

}

export default goal;
