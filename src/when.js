/**
 * @desc when() polls or an jQuery && an element
 * You can disable the log call by adding silentWhen=true as a query parameter to the page
 * or creating a silentWhen variable on the window and setting it to true;
 *
 * @param {string} [selector] - Any valid jQuery selector OR 'stop' which will stop all polling
 * @param {function|array} [callback] - A callback function to run once the selected element has been found OR a list of jQuery things to do i.e. when('#container', 'css', 'color', 'red');
 */

import log from './log';
import getParam from './get-param';

//These two variables are used to keep track of subsequent When calls on the same page
var mainLoop = null;
var elements = [];

function when(selector, callback) {
  if(selector === 'stop') {
    clearInterval(mainLoop);
    mainLoop = null;
    return true;
  }

  //Convert the list of supplied arguments into a true array (since it's actually an object)
  var args = (arguments.length === 1?[arguments[0]]:Array.apply(null, arguments));

  //Add the new element and it's associated arguments to the list of things to look check for.
  elements.push(args);

  //If this is the first time when has been called
  if(mainLoop === null) {
    //Start a loop that checks for elements
    mainLoop = setInterval(function() {
      //Sniff for jQuery in local namespace
      var $jq = (
        typeof jQuery === 'function' ? jQuery : (
          (typeof $ === 'function' && $.fn && $.fn.jquery) ? $ : undefined
        )
      );

      for(var i=0; i<elements.length; i++) {
        //Just some reference variables to make the code easier to read
        var xSelector = elements[i][0];
        var xCallback = elements[i][1];
        var xArguments = elements[i].slice(2);

        //Search the dom for the element
        var $this = typeof $jq === 'function' ? $jq(xSelector) : [];

        //If logging isn't disabled
        if((getParam('silentWhen') === '' || getParam('silentWhen') !== 'true') && window.silentWhen !== true) {
          log('when:', xSelector, $this);
        }

        //If the desired element has been found
        if($this.length) {
          var getType = {};
          //If the supplied callback was indeed a function
          if(xCallback && getType.toString.call(xCallback) === '[object Function]') {
            //Run it
            xCallback.call($this, $this);
          }
          //If the supplied callback was actually an array that looks like a jQuery method
          else if(typeof xCallback === 'string') {
            //Run that on the element we just found
            $this[xCallback].apply($this, xArguments);
          }
          //Stop looking for this element
          elements.splice(i, 1);
        }
      }

      //If there are no more elements to check for
      if(elements.length < 1) {
        clearInterval(mainLoop);
        mainLoop = null;
      }
    }, 50);
  }
}

export default when;
