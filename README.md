# clearhead
> Clearhead Dev Module Library

## Installation

```shell
npm install --save-dev https://github.com/clearhead/clearhead.git
```

## Usage

```javascript
import timpl from 'clearhead/timpl';
```

## Contributing

### Adding modules

Add new modules to `clearhead/src`. Try using ES6!!!

### Testing

There is currently 100% test coverage using Mocha, Chai, Sinon, and PhantomJS.
Testing any new modules is highly encouraged. See the `test` directory for
examples of how to test your modules. If you need to use PhantomJS in order
to test in a browser environment, see `test/optimizely-jquery-polyfill.html` and
`test/fixtures/src/optimizely-jquery-polyfill.js` for an example of how to do so.
Run `gulp` to make sure your code lints and your tests pass.

Ping @casecode if you need any help!
