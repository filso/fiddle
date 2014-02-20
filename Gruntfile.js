'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');


  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-fixmyjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-strip');



  grunt.loadTasks('./grunt-tasks');


  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}


  grunt.initConfig({
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {
        options: {
          configFile: "e2e.conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      },
    },
    'create-spec-files': {
      all: {
        files: ['app/scripts/**/*.js', '!app/scripts/lib/**/*.js', '!test/**/*.js'],
      }
    },
    'sails-linker': {
      defaultOptions: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: 'app/'
        },
        files: {
          // Target-specific file lists and/or options go here.
          'app/index.html': ['app/scripts/**/*.js', '!app/scripts/app.js', '!app/**/*.spec.js']
        },
      },
    },
    fixmyjs: {
      options: {
        jshintrc: '.jshintrc',
        indent: 'spaces'
      },
      test: {
        files: [
          ['app/app.js']
        ]
      }
    },
    karma: {
      options: {
        configFile: 'test/karma.conf.js'
      },
      dev: {
        background: true
      },
      continuous: {
        singleRun: true,
        reporters: ['progress', 'coverage']
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false,
            pretty: true
          }
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          // cwd: 'lib/',      // Src matches are relative to this path.
          src: ['<%= yeoman.app %>/**/*.jade'], // Actual pattern(s) to match.
          // dest: 'build/',   // Destination path prefix.
          ext: '.html' // Dest filepaths will have this extension.
        }]
      }
    },
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },

      templates: {
        files: ['<%= yeoman.app %>/**/*.html'],
        tasks: ['html2js']
      },
      karma: {
        files: ['app/scripts/**/*.js', 'app/scripts/lib/**/*.js', 'test/**/*.js'],
        tasks: ['karma:dev:run']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          // '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '*'
      },
      rules: [{
        from: '^/dashboard$',
        to: '/index.html'
      }, ],
      proxies: [],
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              rewriteRulesSnippet,
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app),
              proxySnippet
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      },
      coverage: {
        path: '<%= yeoman.app %>/../coverage/*/index.html'
      }

    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.app %>/scripts/locales/*',
            '<%= yeoman.app %>/cache/stringdumps/*'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= yeoman.app %>/scripts/**/*.js'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
        // config: 'compass.rb'
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css'
            // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', dont rev images - not worth it!
            // '!<%= yeoman.dist %>/images/loader.gif'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/*.html'],
      // css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/**/*',
            'webservices/*',
            'template/**/*',
            'lib/**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
        }
      }
    },
    html2js: {
      options: {
        base: 'app/',
        module: 'mytemplates'
        // custom options, see below    
      },
      main: {
        src: ['app/template/**/*.html'],
        dest: '<%= yeoman.app %>/scripts/templates.js'
      },
    },
    shell: {
      master_check: {
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        },
        command: 'git checkout master && git pull'
      }
    }
  });


  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'html2js',
      'concurrent:server',
      'configureRewriteRules',
      'configureProxies',
      'connect:livereload',
      'open:server',
      'karma:dev:start',
      'watch'
    ]);
  });

  // grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test',
  //   'karma'
  // ]);
  grunt.registerTask('test', [
    // 'jshint', 
    'html2js',
    'karma:continuous',
    // 'open:coverage'
  ]);


  grunt.registerTask('build-check-ngmin', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'processhtml',
    'html2js',
    'concat',
    'copy',
    'ngmin',
    'uglify',
    'rev',
    'open:server',
    'connect:dist:keepalive'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'processhtml',
    'html2js',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev', // we should get rid of this in the long run
    'usemin'
  ]);

  // Builds a dist and copies it to staging2. Later you need to run deploy.rb to get it to all servers
  // In the future this task should be run only from the CI server
  grunt.registerTask('deploy_to_live', [
    'karma:continuous', // test before deployment
    'build',
    'shell:deploy_to_live'
  ]);
  grunt.registerTask('staging', [
    'build',
    'shell:staging'
  ]);
  grunt.registerTask('staging2', [
    'build',
    'shell:staging2'
  ]);
  grunt.registerTask('dev', [
    'build'
  ]);

  grunt.registerTask('check-ngmin', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'processhtml',
    'concat',
    'copy',
    'cdnify',
    'ngmin',

  ]);

  grunt.registerTask('default', [
    // 'jshint',
    // 'test',
    'server'
  ]);
};