module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../app',

    // list of files / patterns to load in the browser
    files: [


      'bower_components/jquery/jquery.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
       "bower_components/nprogress/nprogress.js",


      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'http://www.busuu.com/js/busuuajax/restws/user_locales_1.0',

      'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
      "bower_components/lodash/dist/lodash.js",

      'bower_components/angular-mocks/angular-mocks.js', 

      '../test/mockData.js',
      '../test/*.js',

      'lib/*.js',
      'lib/pusher/*.js',

      'lib/gritter/jquery.gritter.js',
      'scripts/app.js',
      'scripts/**/*.js',
      // 'test/mock/**/*.js',
      // 'test/spec/**/*.js'
    ],

    preprocessors: {
      'scripts/**/!(*spec|*templates|*development).js': 'coverage'
    },
    coverageReporter: {
      type : 'html',
      dir : '../coverage/'
    },


    exclude: [],
    

    frameworks: ['jasmine'],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    // reporters: ['progress', 'coverage'],
    // dont run coverage in all lines, cause they get lost
    reporters: ['progress'],
    //reporters : ['progress'],
    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // logLevel: LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    singleRun: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // browsers: ['PhantomJS'],
    // 
    browsers: ['Chrome'],

    captureTimeout: 60000

  });
};