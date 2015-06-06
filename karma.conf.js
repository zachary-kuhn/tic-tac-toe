module.exports = function (config) {
  config.set({

    frameworks: ['mocha', 'chai'],

    files: [
      'build/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/**/*.js'
    ],

    browsers: ['PhantomJS'],

    reporters: [
      'dots',
      // 'coverage'
    ],

    basePath: './',
    captureTimeout: 60000,
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,
    reportSlowerThan: 500,
    runnerPort: 9100,

  });
};
