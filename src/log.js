/**
 * TODO: Better Docs -- TomF is a terrible person
 * @desc log() console.logs based on auto sniffing debug cookie
 *
 * @param {...args} args - prefixed with 'clearhead:'
 *
 * @return {null}
 */
function log(...args) {
  try {
    if (/clearhead-debug|localhost|optimizely_x/.test(location.href))
      document.cookie = 'clearhead-debug=true;path=/;';
    if (/clearhead-debug=true/.test(document.cookie))
      console.info('clearhead:', ...args);
  } catch (a) {}
}

export default log;
