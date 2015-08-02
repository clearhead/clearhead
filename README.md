# chdev
> A module library for the Clearhead Dev Team

## Installation

The package is currently not on [npm](https://www.npmjs.com/).
For now, just unpack the tarball to use it in your experiments.

```shell
cd path/to/your/experiment
npm install --save-dev path/to/chdev/dist/chdev.tgz
```

## Usage

```javascript
import timpl from 'chdev/timpl';
```

## Contributing

### Adding modules

Add new modules to `chdev/src`. Try using ES6!!!

### Testing

There is currently 100% test coverage using Mocha, Chai, Sinon, and PhantomJS.
Testing any new modules is highly encouraged. See the `test` directory for
examples of how to test your modules. If you need to use PhantomJS in order
to test in a browser environment, see `test/jquery-polyfill.html` and
`test/fixtures/src/jquery-polyfill.js` for an example of how to do so.
Run `gulp` to make sure your code lints and your tests pass.

Ping @casecode if you need any help!

### Repackaging

After adding new modules, run `gulp package` to repackage a new tarball.
The package task automatically commits the new tarball and adds a timestamp
to the commit message.
