/**
 * @desc appendCss() appends css once jQuery + head element have finished
 * loading
 *
 * @param {String} string of css rules, with or without style tags
 */
function appendCss(css){
  if (css.indexOf('<style>') !== 0 ) css = css.replace(/^/,'<style>');
  if (css.indexOf('</style>') === -1 ) css = css.replace(/$/,'</style>');
  document.head.insertAdjacentHTML('beforeend', css);
}

export default appendCss;
