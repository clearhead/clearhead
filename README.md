# `clearhead` [![Circle CI](https://circleci.com/gh/clearhead/clearhead.svg?style=svg)](https://circleci.com/gh/clearhead/clearhead)

TODO: Quick marketing use case / maybe a screenshot

## Installation

```shell
# npm install phantomjs -g
npm install --save-dev clearhead
```

## Usage

```javascript
import timpl from 'clearhead/timpl';
```

NOTE: ES6 +browserify compilation best used alongside `gulp-clearbuild`

### Standalone

Make sure browserify is installed, either in your project or globally (`npm install browserify -g`)

```javascript
var slugify = require('clearhead/slugify');

var articleTitle = 'How to use the Clearhead module library!';
var articleSlug = slugify(articleTitle);
```
Build your code: `browserify test.js -o output.js`

### Inside a project


# Modules

### async

@casecode - Can you help fill in a description and example for this one?

```javascript
//example code here
```

### batch

Breaks an array into smaller arrays of a given length.

```javascript
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

Sets a cookie with a given name, value, and optional expiration date (in days).

```
import cookie from 'clearhead/cookie';

var cookieName = 'the-name-of-my-cookie';
var cookieVal = 'the-value-of-my-cookie';

cookie.set(cookieName, cookieVal, 365);
```
### coremetrics

@tomfuertes, not sure how this one works/a good code example for it

```javascript
//example code here
```

### curry

Returns a curried function that will not be called until all arguments received.

```javascript
//example code here
```

### debounce

Prevents a function from being recalled repeatedly. The function will be called again after it stops being called for N milliseconds.

```javascript
function dbFunction() {
  console.log('debounce worked!');
};
debounce(dbFunction, 1000);
```

### domready

Runs a function on domready - to be used on sites that don't have jQuery right away and/or not at all but you need to wait till the DOM is ready to run something.
```javascript
// example code here
```

### get-param

Gets a param value from location.search.

```javascript
// example code here
```

### goal
Fires strings into auto-detected analytics installs.

```javascript
const goal = require('clearhead/goal').bind(null, 'exp1-foo');

goal('click', '#bar');

optimizely.push(['trackEvent', 'exp1-foo-click-#bar'])
monetateQ.push(['trackEvent', ['exp1-foo-click-#bar']])
s.tl() // won't fire b/c !/^(prop|evar)/i.test(args[0])
dataLayer.push({event:'clearhead.goal', meta:{category, action, label}})
ga('send', 'event', 'exp1-foo', 'click', '#bar')
_gaq.push(['_trackEvent', 'exp1-foo', 'click', '#bar']);

const goal = require('goal').bind(null, 'prop46');
goal('exp1-foo', 'clicked-header');
optimizely.push(['trackEvent', 'prop46-exp1-foo-clicked-header'])
monetateQ.push(['trackEvent', ['prop46-exp1-foo-clicked-header']])
require('clearhead/track')('prop46', 'exp1-foo-clicked-header');
```

### google-analytics

Sends information to googleAnalytics.

```javascript
googleAnalytics(1234567, 'my-custom-variable');
```

### google-tag-manager

Exposes information to googleTagManager by setting a global variable.

```javascript
googleTagManager(1234567, 'my-custom-variable');
```

### load-css

Loads a CSS file asynchronously.

```javascript
loadCSS('../styles/styles.css', null, media);
```

### load-script

Loads a script and fires callback.

```javascript
function optCallBack() {
  console.log('my callback function is firing after the script loads!');
};
loadScript('../src/main.js', optCallBack);
```

### slugify

Returns the 'slug' of a string (replaces non-word characters with hyphens).

```javascript
var articleTitle = 'How to use the Clearhead module library!';
var articleSlug = slugify(articleTitle);
console.log(articleSlug); //Outputs: how-to-use-the-clearhead-module-library
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
