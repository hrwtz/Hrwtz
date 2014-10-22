module.exports = function(grunt) {

	// All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			// Configuration for concatinating files goes here.
			dist: {
				src: [
						'../js/libs/modernizr.custom.55707.js',
						'../js/libs/jquery.panelSnap.js',
						'../js/src/common.js'  
				],
				dest: '../js/pro/global.js',
			},
		},

		uglify: {
		    build: {
		        src: '../js/pro/global.js',
		        dest: '../js/pro/global.min.js',
		    },
		},


		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: '../img/src/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: '../img/pro/'
		        }]
		    },
		    video: {
		        files: [{
		            expand: true,
		            cwd: '../video/src/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: '../video/pro/'
		        }]
		    }
		},

		compass: {
			dev: {
		    	options: {              
		        	sassDir: '../sass',
		        	cssDir: '../css',
		        	fontsDir: '../fonts',
		        	imagesDir: '../img/pro/',
		        	images: '../img/pro/',
		        	javascriptsDir: '../js/pro',
		        	environment: 'production',
		        	outputStyle: 'compressed',
		        	relativeAssets: false,
		        	httpPath: '.',
		        }
		    },
		},

		watch: {
		    scripts: {
		        files: ['../js/**/**.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    images: {
		    	files: ['../img/src/**.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
		    },
		    compass: {
		    	files: ['../**/*.{scss,sass}'],
		    	tasks: ['compass:dev'],
		    }

		},

		svgstore: {
		    options: {
		    	//prefix : 'i-', // This will prefix each ID
		    },
		    default: {
		    	files: {
					'../img/pro/svg-defs.svg': ['../img/src/svg/*.svg']
				}
		    }
		},

		responsive_videos: {
		    myTask: {
		      options: {
		        sizes: [{
		          width: 1050,
		          poster: false
		        },{
		          width: 600,
		          poster: false
		        }]
		      },
		      files: [{
		        expand: true,
		        src: ['src/*.{mov,mp4}'],
		        cwd: '../video',
		        dest: '../video/pro/'
		      }]
		    }
		  },

	});

	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-svgstore');

	grunt.loadNpmTasks('grunt-responsive-videos');

	// Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', [/*'responsive_videos', */'concat', 'uglify', 'svgstore', 'imagemin', 'compass', 'watch']);

};
