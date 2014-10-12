module.exports = function(grunt) {

	// All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			// Configuration for concatinating files goes here.
			dist: {
				src: [
						'../js/libs/typed.js',
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
		        	environment: 'development',
		        	outputStyle: 'nested',
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



	});

	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-svgstore');

	// Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat', 'uglify', 'svgstore', 'imagemin', 'compass', 'watch']);

};
