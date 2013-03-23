
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
    	my_target: {
      		files: {
        		'public/javascripts/main-min.js': ['public/javascripts/Ink-v1.js']
      		}
    	}
  	},

    cssmin: {
  		compress: {
    		files: {
      			'public/stylesheets/main-min.css': ['public/stylesheets/ink.css', 'public/stylesheets/mine.css']
    		}
  		}
	}
  });

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin']);

};

