module.exports = function(grunt) {

	// All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
		    compass: {
		    	files: ['app/assets/**/*.{scss,sass}'],
		    	tasks: ['compass:dev'],
		    },
		    svgstore: {
		    	files: ['app/assets/img/svg/**/*.svg'],
		    	tasks: ['svgstore:dev'],
		    },


		},

		svgstore: {
		    default: {
		    	files: {
					'app/assets/img/svg-defs.svg': ['app/assets/img/svg/*.svg']
				}
		    }
		},

		compass: {
			dev: {
		    	options: {              
		        	sassDir: 'app/assets/sass',
		        	cssDir: 'app/assets/css',
		        	fontsDir: 'app/assets/fonts',
		        	imagesDir: 'app/assets/img/',
		        	images: 'app/assets/img/',
		        	environment: 'production',
		        	outputStyle: 'compressed',
		        	relativeAssets: false,
		        	httpPath: '.',
		        }
		    },
		},

		copy: {
		  	build: {
		    	files: [
		    		{expand: true, cwd: 'app/assets/css/', src: ['**'], dest: 'dist/assets/css/'},
		    		{expand: true, cwd: 'app/assets/misc/', src: ['**'], dest: 'dist/assets/misc/'},
		    		{expand: true, cwd: 'app/assets/img/', src: ['svg-defs.svg'], dest: 'dist/assets/img/'},
		    		{expand: true, cwd: 'app/assets/img/favicon/', src: ['**'], dest: 'dist/assets/img/favicon/'},
		    		{expand: true, cwd: 'app/components/', src: ['**/*.html'], dest: 'dist/components/'},
		    		{expand: true, cwd: 'app/shared/', src: ['**/*.html'], dest: 'dist/shared/'},
		    	],
		  	},
		},


		concat: {
			build: {
				src: [
					'bower_components/angular-ui-router/release/angular-ui-router.min.js',
					'bower_components/panelsnap/jquery.panelSnap.js',
					'app/**/*.js',
					'!app/app.config.js',
					'.tmp/config.js'
				],
				dest: '.tmp/app.js',
			},
		},

		uglify: {
		    build: {
		        src: '.tmp/app.js',
		        dest: 'dist/app.js',
		    },
		},

		clean: {
			tmp: ['.tmp'],
			dist: ['dist']
		},

		ngconstant: {
    		ngconstant: {
    			options: {
      				name: 'hrwtzApp',
      				dest: '.tmp/config.js',
      				constants: {
        				environment: 'production'
      				},
      				deps: false
    			}
  			},

  		},

  		aws: grunt.file.readJSON('aws_keys.json'),
  		aws_s3: {
		  	production: {
		    	options: {
					type: "s3",
					gzip: true,
					accessKeyId: '<%= aws.AWSAccessKeyId %>',
					secretAccessKey: '<%= aws.AWSSecretKey %>',
					region: "us-east-1",
					bucket: "hrwtz.com",
					differential: true
		    	},
		    	files: [
		      		{expand: true, cwd: 'dist/', src: ['**'], dest: '/'},
		    	]
		  	},
		},
	});

	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-aws-s3');
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-responsive-videos');

	grunt.registerTask('build', ['ngconstant', 'concat', 'uglify', 'clean:tmp', 'svgstore', 'compass', 'copy']);
	grunt.registerTask('deploy', ['build', 'aws_s3']);

};
