module.exports = function(grunt) {

  grunt.initConfig({
      
      pkg: grunt.file.readJSON('package.json'),

	  less: 
	  {
	      development: 
	      {
	        options: 
	        {
	          compress: true,
	          yuicompress: true,
	          optimization: 2
	        },
	        files: 
	        [{
	  				expand: true,
	  				cwd: "bower_components/bootstrap/less",
	  				src: ['**/bootstrap.less', '**/local.less'],
	  				dest: "www/css/", 
	  				ext: ".css",
	        }]
	      }
	  },
      
      copy: {
          main: {
              expand: true,
              cwd: 'bower_components/bootstrap/dist/css/',
              src: ['bootstrap.min.css', 'starter-template.css'],
              dest: 'www/css/',
              flatten: true,
              filter: 'isFile',
          }
      },
                
              
      
      concat: {
        options: {
            seperator: ';',
        },
        dist: {
            src: ['bower_components/jquery/dist/jquery.js', 'bower_components/knockout/dist/knockout.js', 'bower_components/d3/d3.js', 'bower_components/bootstrap/dist/bootstrap.js'],
            dest: 'www/js/libs.js',
        }
       },
      
      bower_concat: {
          all:{
            dest: 'www/js/libs.js',
            include: [
                'knockout',
                'd3',
                'bootstrap'
            ]
          }
      },
      
       uglify: {
           dist: {
               files: {
                   'www/js/libs.js': ['<%= concat.dist.dest %>']
               }
           }
       },
      
      jshint: {
      //define the files to lint
        files: 'www/site.js',
          
        options: {
            force: true
        }
      }
                   

  });

  // This will automatically load any grunt plugin you install, such as grunt-contrib-less.
  require('load-grunt-tasks')(grunt);
    
  
    
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-bower-concat');    
    
    
    
  grunt.registerTask('package', ['concat', 'uglify']);  
  grunt.registerTask('validate', 'jshint');
  grunt.registerTask('build_all', [ 'less', 'package', 'jshint']); 
  grunt.registerTask('default', 'build_all');   
    
};