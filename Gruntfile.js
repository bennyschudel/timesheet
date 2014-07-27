/* jshint indent: false */

module.exports = function(grunt) {
	var _ = require('lodash');

	var config = {
		paths: {
			PUBLIC: 'www/',
			SOURCE: 'source/',
			BUILD: 'dist/',
			BOWER_COMPONENTS: 'bower_components/',
		}
	};

	var spawn = require('child_process').spawn;

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		config: config,

		watch: {
			options: {
				livereload    : true,
				interrupt     : true,
				debounceDelay : 500
			},
			css: {
				files: [
					'<%= config.paths.SOURCE %>sass/**/*.scss'
				],
				tasks: ['sass:dev']
			},
			js_main: {
				files: [
					'<%= config.paths.SOURCE %>js/**/*.js'
				],
				tasks: ['copy:dev_js']
			},
		},

		sass: {
			dev: {
				options: {
					includePaths : [
						'../../shared/sass/'
					],
				},
				files: [
					{
						expand : true,
						cwd    : '<%= config.paths.SOURCE %>sass/',
						src    : ['**/*.scss'],
						dest   : '<%= config.paths.PUBLIC %>assets/css/',
						ext    : '.css'
					},
				],
			},
		},

		copy: {
			dev_js: {
				files: [
					{
						expand: true,
						cwd: '<%= config.paths.SOURCE %>',
						src: 'js/**/*',
						dest: '<%= config.paths.PUBLIC %>assets/',
					},
				],
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= config.paths.PUBLIC %>',
						src: [
							'*.html',
							'*.{ico,png,txt}',
							'assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
							'assets/css/fonts/*',
						],
						dest: '<%= config.paths.BUILD %>'
					},
				],
			},
		},

		shell: {
			install_bower: {
				command: 'tasks/bower.sh',
			},
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.paths.BUILD %>/{,*/}*',
						'!<%= config.paths.BUILD %>/.git*',
					],
				}],
			},
			server: '.tmp',
		},

		filerev: {
			dist: {
				src: [
					'<%= config.paths.BUILD %>assets/js/{,*/}*.js',
					'<%= config.paths.BUILD %>assets/css/{,*/}*.css',
					'<%= config.paths.BUILD %>assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.paths.BUILD %>assets/css/fonts/*',
				],
			},
		},

		useminPrepare: {
			html: '<%= config.paths.PUBLIC %>/index.html',
			options: {
				dest: '<%= config.paths.BUILD %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		usemin: {
			html: ['<%= config.paths.BUILD %>{,*/}*.html'],
			css: ['<%= config.paths.BUILD %>assets/css/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= config.paths.BUILD %>','<%= config.paths.BUILD %>assets/img/']
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				sub  : true,
				boss : true
			},
			target: ['<%= config.paths.SOURCE %>/js/app/{,*/}*.js'],
		},

	});

	require('load-grunt-tasks')(grunt);

	// ---
	// runs livereload for development
	// ---
	grunt.registerTask('dev', [
		'sass:dev',
		'watch',
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'copy:dist',
		'concat:generated',
		'cssmin:generated',
		'uglify:generated',
		'filerev',
		'usemin',
	]);

	grunt.registerTask('install_bower', [
		'shell:install_bower',
	]);

};
