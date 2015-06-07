module.exports = function (config) {
  config.set({

    frameworks: ['browserify', 'mocha', 'chai'],

    files: [
      'app/**/*.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'app/**/*.js': ['browserify']
    },

    browsers: ['PhantomJS'],

    reporters: [
      'progress', 'coverage'
    ],

    basePath: './',
    captureTimeout: 60000,
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,
    reportSlowerThan: 500,
    runnerPort: 9100,

    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    }
  });
};
