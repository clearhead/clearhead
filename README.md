# clearhead [![Circle CI](https://circleci.com/gh/clearhead/clearhead.svg?style=svg)](https://circleci.com/gh/clearhead/clearhead)

> Clearhead Dev Module Library

## Installation

```shell
npm install --save-dev clearhead
```

## Usage

```javascript
import timpl from 'clearhead/timpl';
```

## Contributing

### Contributing

* Add new modules to `clearhead/src`. Try using ES6!!!
* Submit updates as PRs.

### On Landing

Run `npm run bump` on landing any PRs to auto build / test / bump / push.

### Testing

There is currently 100% test coverage using Mocha, Chai, Sinon, and PhantomJS.
Testing any new modules is highly encouraged. See the `test` directory for
examples of how to test your modules. If you need to use PhantomJS in order
to test in a browser environment, see `test/optimizely-jquery-polyfill.html` and
`test/fixtures/src/optimizely-jquery-polyfill.js` for an example of how to do so.
Run `gulp` to make sure your code lints and your tests pass.

Ping @casecode if you need any help!

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
