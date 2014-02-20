module.exports = function(grunt) {
	var path = require('path');
	var fs = require('fs');

	// first argument is a src of stub spec, second is the directory that we search for files without .spec files
	// sample:
	// 
	// Filips-MacBook-Pro:ng-wc filipsobczak$ grunt create-specs:app/scripts/controllers/modal:app/scripts/controllers/modal/*
	// 
  grunt.registerTask('create-specs', 'Create spec files stubs for all JS.', function(stubSrcPath, directory) {
  	var _ = grunt.util._;
  	var files = grunt.file.expand([directory + '/*.js', '!app/scripts/**/*spec.js']);
  	if (!grunt.file.exists(stubSrcPath)) {
  		grunt.log.error('File ' + stubSrcPath + ' doesn\'t exist');
  		grunt.log.writeln(files);
  		return;
  	}

    var stubBase = path.basename(stubSrcPath, '.spec.js');

    files.forEach(function(srcPath) {


    	var srcBase = path.basename(srcPath, '.js');
    	var dstPath = path.dirname(srcPath) + '/' + srcBase + '.spec.js';
      if (!grunt.file.exists(dstPath)) {

      	grunt.file.copy(stubSrcPath, dstPath);
      	grunt.log.writeln('Copied', stubSrcPath, 'to', dstPath, 'and replacing string', stubBase, 'with', srcBase);

        var contents = grunt.file.read(dstPath);
        contents = contents.replace(stubBase, srcBase);
        grunt.file.write(dstPath, contents);

      }

    });

  });
}