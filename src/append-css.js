/**
 * @desc appendCss() appends css once jQuery + head element have finished
 * loading
 *
 * @param {String} string of css rules, with or without style tags
 */
import when from './when';

function appendCss(css){
  if (css.indexOf('<style>') !== 0 ) css = css.replace(/^/,'<style>');
  if (css.indexOf('</style>') === -1 ) css = css.replace(/$/,'</style>');
  when('body', function(){
    document.head.insertAdjacentHTML('beforeend', css);
  });
}

export default appendCss;
