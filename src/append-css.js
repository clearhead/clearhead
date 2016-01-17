/**
 * @desc appendCss() appends css once jQuery + head element have finished loading
 *
 * @param {String} should be wrapped in style tags <style>+ 'css' + </style>
 */
import when from './when';

function appendCss(css){
  when('body', function(){
    $('head').append(css)
  });  
}

export default appendCss;
