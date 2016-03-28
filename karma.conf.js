// Karma configuration
// Generated on Wed Aug 26 2015 13:02:55 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['es6-shim', 'browserify', 'mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'src/*.js',
      'test/*.js',
      // 'test/fixtures/src/*.js',
      // 'src/optimizely-jquery-polyfill/*.js',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': ['browserify', 'sourcemap'],
      'test/*.js': ['browserify', 'sourcemap'],
      // 'test/fixtures/src/*.js': ['browserify'],
      // 'src/optimizely-jquery-polyfill/*.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', {presets: 'es2015'}],
        ['browserify-istanbul', {instrumenterConfig: {embedSource: true}}],
      ],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      reporters: [{'type': 'html', dir: 'coverage'}],
    },


    // web server port
    port: 9877,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  })
}
