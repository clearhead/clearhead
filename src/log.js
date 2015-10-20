/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc log() console.logs based on auto sniffing debug cookie
 *
 * @param {...args} args - prefixed with 'clearhead:'
 *
 * @return {null}
 */

import notify from './notify';
import doc from './helpers/document';
import loc from './helpers/location';

if (/clearhead-(debug|notify)|localhost|optimizely_x/.test(loc.href)) {
  doc.cookie = 'clearhead-debug=true;path=/;';
}

let should = /clearhead-debug=true/.test(doc.cookie);

function log(...args) {
  'use strict';
  if (should) { try {
    console.info('clearhead:', ...args);
    notify(...args);
  } catch (a) {} }
}

export default log;
