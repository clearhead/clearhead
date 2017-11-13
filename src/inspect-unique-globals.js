/**
 * Logs an object containing all the unique global variables on a page 
 * 
 * @return {undefined}
 */
function inspectUniqueGlobals() {

	// Create object that will contain unique global variables
	var uniqueProperties = {};

	// Use an iframe to compare variables
	var iframe = document.createElement('iframe');

	// On iframe load, process global properties
	iframe.onload = function() {
	  
	  // Get list of standard global objects from the iframe
	  var defaultGlobals = Object.keys(iframe.contentWindow);
	  
	  // Loop through every window-level variable
	 	for (var item in window) {
	    var prop = window[item];
	    
	    // If the property is not found in the iframe's globals, then add it to the uniqueProperties object
	    if (defaultGlobals.indexOf(item) === -1) {
	      uniqueProperties[item] = prop;
	    }
	 	}
	 
	 	// Inspect unique window properties
	 	console.log(uniqueProperties);
	};
	    
	// Attach blank source iframe to DOM
	iframe.src = 'about:blank';
	document.body.appendChild(iframe);
}