module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'test/unit/**/*.js',
      'test/unit/artifacts/**/*.js',
      'app/js/**/*.js',
      'app/partials/**/*.html',
      'app/lib/jquery/jquery-1.11.0.min.js',
      'app/lib/underscore/underscore-min.js',
      {pattern: 'app/img/*.jpg', included: false, served: true}
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-ng-html2js-preprocessor',
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    preprocessors : {
      'app/partials/**/*.html': 'html2js'
    }
})}
