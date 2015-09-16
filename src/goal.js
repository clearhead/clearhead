/**
 * @desc goal() fires strings into auto detected analytics installs
 *
 * @param {str}
 *
 * @return {void}
 *
 * usage:
 *   import goal from 'clearhead/goal';
 *   goal('exp1-foo', 'click', '#bar'); ==>
 *   // optimizely.push(['trackEvent', 'exp1-foo-click-#bar'])
 *   // monetateQ.push(['trackEvent', ['exp1-foo-click-#bar']])
 *   // s.tl() // won't fire b/c !/^(prop|evar)/i.test(args[0])
 *   // dataLayer.push({event:'clearhead.goal', meta:{category, action, label}})
 *   // ga('send', 'event', category, action, label)
 *   // _gaq.push(['_trackEvent', category, action, label]);
 */
import track from './track';
const log = require('./log').bind(null, 'clearhead/goal:');

function goal(category, action, label) {
  'use strict';

  const lowercaseSlug = [category, action, label].join('-').toLowerCase();

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
    log('s.tl', category, [action, label].join('-'));
    track(category, [action, label].join('-'));
    return;
  }

  // google tag manager > ga > _gaq
  if (!!window.dataLayer && !!window.dataLayer.push) {
    log('dataLayer.push', 'event:clearhead.goal',
      'meta: {', 'category:', category, 'action:', action, 'label:', label, '}'
    );
    window.dataLayer.push({
      event: 'clearhead.goal',
      meta: {
        category, action, label
      },
    });
  } else if (typeof window.ga === 'function') {
    log('ga', category, action, label);
    window.ga('send', 'event', category, action, label);
  } else if (!!window._gaq && !!window._gaq.push) {
    log('_gaq', category, action, label);
    window._gaq.push(['_trackEvent', category, action, label]);
  }

  // intentional leave coremetrics out

}

export default goal;
