# `clearhead` [![Circle CI](https://circleci.com/gh/clearhead/clearhead.svg?style=svg)](https://circleci.com/gh/clearhead/clearhead)

TODO: Quick marketing use case / maybe a screenshot

## Installation

```shell
# npm install phantomjs -g
npm install --save-dev clearhead
```

## Usage

### Standalone

Make sure browserify is installed, either in your project or globally (`npm install browserify -g`)

```javascript
//test.js
var slugify = require('clearhead/slugify');

var articleTitle = 'How to use the Clearhead module library!';
var articleSlug = slugify(articleTitle);
```
Build your code: `browserify test.js -o output.js`

### Inside a project

```javascript
import timpl from 'clearhead/timpl';
```

NOTE: ES6 +browserify compilation best used alongside `gulp-clearbuild`

# Modules

### async

Provides a method of avoiding nested callbacks when performing multiple asynchronous operations (note that this module does not enforce that the operations be asynchronous). The module exposes two methods `series` and `waterfall`.

**series(queue, iterator, [done])**

Applies the function `iterator` to each item in the `queue` array, in sequence.
The `iterator` is called with an item from the list, and a done callback for when it
has finished.

```javascript
import { series } from 'clearhead/async';

// Sum array items asynchronously using a series.
series([1, 2, 3, 4], (curr, next, prev = 0) => {
	// curr => the current item value
	// prev => the previous item value
	// next => the callback function with previous bound to the current item or the first argument passed to next on the previous iteration.
  setTimeout(() => {
    next(prev + curr);
  }, 0);
}, (result) => {
  // do something with the result
});
```

**waterfall(queue)**

Runs the `queue` array of functions in sequence, each passing its results to the next in
the array.

```javascript
import { waterfall } from 'clearhead/async';

waterfall([
	function start(next) {
		next(0);
	},
	function add2(running, next) {
		next(running + 2);
	},
	function multiplyBy5(running, next) {
		next(running * 5);
	},
	function(result) {
		// do something with the result
	},
]);
```

### batch

Breaks an array into smaller arrays of a given length.

```javascript
import batch from 'clearhead/batch';

var longArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var smallerArrays = batch(longArray, 2);

/*

smallerArrays -> [
	['zero', 'one'],
	['two', 'three'],
	['four', 'five'],
	['six', 'seven'],
	['eight', 'nine']
]

*/
```

### console-polyfill

@tomfuertes - Can you help fill in a description and example for this one?

```javascript
//example code here
```

### cookie

Sets, gets, and deletes a cookie with a given name, value, and optional expiration date (in days).

```javascript
import cookie from 'clearhead/cookie';

var cookieName = 'the-name-of-my-cookie';
var cookieVal = 'the-value-of-my-cookie';

cookie.set(cookieName, cookieVal, 365);
cookie.get(cookieName); //Outputs 'the-value-of-my-cookie'
cookie.del(cookieName);
```
### coremetrics

Sends information to CoreMetrics

```javascript
import coremetrics from 'clearhead/coremetrics';

coremetrics(0123456789);
```

### curry

Returns a curried function that will not be called until all arguments received.

```javascript
import curry from 'clearhead/curry';

var madlib = curry(function(pronoun, adjective, noun) {
	console.log(pronoun+' is a '+adjective+' '+noun);
});

var myMadlib = madlib('Tesla');
//...
myMadlib = myMadlib('awesome');
//...
myMadlib('scientist');
```

### debounce

Prevents a function from being recalled repeatedly. The function will be called again after it stops being called for N milliseconds.

See https://css-tricks.com/the-difference-between-throttling-and-debouncing/ for a good writeup for the difference between debounce and throttle.

```javascript
import debounce from 'clearhead/debounce';

//The inner function will only be called after the user has stopped scrolling for 100ms
$(window).on('scroll', debounce(function() {
  console.log('The user started scrolling and this function didn\'t execute until there was a 100ms break in the scrolling');
}, 100));
```

### domready

Runs a function on domready - to be used on sites that don't have jQuery right away and/or not at all but you need to wait till the DOM is ready to run something.
```javascript
import domready from 'clearhead/domready';

domready(function() {
	console.log('The dom is ready! Do your thing.');
});
```

### get-param

Gets a param value from location.search.

```javascript
import getParam from 'clearhead/get-param';

//When run on the page: http://test.com?name=bob
console.log(getParam('name')); //Outputs: "bob"
```

### goal
Fires strings into auto-detected analytics installs.

```javascript
const goal = require('clearhead/goal').bind(null, 'exp1-foo');

goal('click', '#bar');
```

### google-analytics

Sends information to googleAnalytics.

```javascript
import googleAnalytics from 'clearhead/google-analytics';

googleAnalytics(1234567, 'my-custom-variable');
```

### google-tag-manager

Exposes information to googleTagManager by setting a global variable.

```javascript
import googleTagManager from 'clearhead/google-tag-manager';

googleTagManager(1234567, 'my-custom-variable');
```

### load-css

Loads a CSS file asynchronously.

```javascript
import loadCSS from 'clearhead/load-css';

loadCSS('../styles/styles.css', null, media);
```

### load-script

Loads a script and fires callback.

```javascript
import loadScript from 'clearhead/load-script';

function optCallBack() {
  console.log('my callback function is firing after the script loads!');
};
loadScript('../src/main.js', optCallBack);
```

### log

Like a regular console.log but only fires in dev environments (localhost, preview links, debug cookies etc) so you can leave it in your code while pushing to production.

```javascript
import log from 'clearhead/log';

log('Something is happening'); //Outputs to the console when run from http://localhost:8000/ but not http://clientwebsite.com
```

### notify

Notify.js is a jQuery plugin to provide simple yet fully customisable notifications.

```javascript
import notify from 'clearhead/notify';

$.notify('Hello!');

// or pass in optional message style (e.g. success, info, warn, or error)
$.notify('Uh oh!', 'warn');
```

### object-assign-polyfill

Gives all browsers object.assign capabilities.

```javascript
import anything from 'clearhead/object-assign-polyfill';

var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

### onload-css

Adds onload support for asynchronous stylesheets loaded with loadCSS. Used with loadCSS above.

```javascript
import onloadCSS from 'clearhead/onload-css';

var stylesheet = loadCSS('path/to/mystylesheet.css');
onloadCSS(stylesheet, function() {
    console.log('Stylesheet has asynchronously loaded.');
});
```

### optimizely-jquery-polyfill

Returns a pollyfilled jQuery.

```javascript
import pollyfill from 'clearhead/optimizely-jquery-polyfill';

pollyfill($); // local ref to optimizely.$
```

### preload

Preloads images.

```javascript
import preload from 'clearhead/preload';

var arrayOfLoadedImages = preload('./imgs/img01.jpg', './imgs/img02.jpg', './imgs/img03.jpg', './imgs/img04.jpg');
```

### report

Sends an error back to GA as events for wallboards. Why a module? Because not all clients load window.ga so this just reverse engineers the endpoint using a beacon.

```javascript
//example code here
```

### return-visitor

Fires code when a user returns to an experiment.

```javascript
import returnVisitor from 'clearhead/return-visitor';

returnValue('unique-name-for-tracking-users-for-just-this-call', function() {
	console.log('The user was last here over 30min ago');
});
```

### slugify

Returns the 'slug' of a string (replaces non-word characters with hyphens).

```javascript
import slugify from 'clearhead/slugify';

var articleTitle = 'How to use the Clearhead module library!';
var articleSlug = slugify(articleTitle);
console.log(articleSlug); //Outputs: how-to-use-the-clearhead-module-library
```

### store

Exposes a simple pattern to get / set from localStorage.

```javascript
import store from 'clearhead/store';

store.set('key', 'value');
store.get('key'); //Returns 'value'
store.del('key');
```

### throttle

Borrowed from http://underscorejs.org/docs/underscore.html

Returns a function, that, when invoked, will only be triggered at most once during a given window of time. Normally, the throttled function will run as much as it can, without ever going more than once per wait duration; but if you’d like to disable the execution on the leading edge, pass {leading: false}. To disable execution on the trailing edge, ditto.

See https://css-tricks.com/the-difference-between-throttling-and-debouncing/ for a good writeup for the difference between throttle and debounce.

```javascript
import throttle from 'clearhead/throttle';

//The inner function will only be called every 100ms while the user is scrolling
$(window).on('scroll', throttle(function() {
  console.log('You\'ll see this message every 100ms while the user is still scrolling');
}, 100));
```

### timpl

Uses double-handlebar syntax to template a string with a data object.

```javascript
import timpl from 'clearhead/timpl';

console.log(timpl('<div>{{name}}</div>', {name: 'Bob'})); //Outputs: <div>Bob</div>
```

### track

Sends a prop to SiteCatalyst.

```javascript
const track = require('clearhead/track').bind(null, 'prop52');

track('some-event');
```

### universal-analytics

Sends information to Google Universal Analytics.

```javascript
import universalAnalytics from 'clearhead/universal-analytics';

universalAnalytics(1234567, 'my-custom-variable');
```

### when

Polls for a jQuery element, and executes code when the element is found. Also can have optional timeout.

```javascript
function callBackFun() {
  console.log('it happened!');
};

when($('.this-div'), callBackFun, 500);
```

### wrap

Helper pattern for try / catch / report.

```javascript
// example code here
```

## Contributing

* Add new modules to `clearhead/src` using ES6!!!
* Submit updates as PRs.

### On Landing

Run `npm run bump` on landing any PRs to auto build / test / bump / push.

### Testing

There is currently test coverage using Mocha, Chai, Sinon, and PhantomJS.
Testing any new modules is highly encouraged. See the `test` directory for
examples of how to test your modules. If you need to use PhantomJS in order
to test in a browser environment, see `test/optimizely-jquery-polyfill.html` and
`test/fixtures/src/optimizely-jquery-polyfill.js` for an example of how to do so.
Run `gulp` to make sure your code lints and your tests pass.

Ping @casecode ||  @beaulm || @tomfuertes  if you need any help!

## License

The MIT License (MIT)

Copyright (c) 2015 Clearhead

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
