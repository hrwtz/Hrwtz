'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.factory('workDataSet', ['environment', function(environment){
		function getVideoFilename(filename, fileType) {
			if (environment === 'production') {
				var videoSize = screen.width > 600 ? 500 : 1050;
				return filename + '-' + videoSize + '.' + fileType;
			} else {
				return filename + '.mov';
			}
		}

		var workData = [
			{
				slug: 'turnkey',
				title: 'Turnkey Media Solutions',
				copy: 'Turnkey Media Solutions provides in-store music and messaging for their clients. They were looking for a clean and modern site that would focus on their services. To really draw attention to what they do, multiple audio players were created throughout the website. These players give TKM a unique portfolio that is easily accessible to the user.',
				skills: ['MVCSS', 'HTML5 Audio Players', 'WordPress/PHP development','Front End Development','Responsive Design'],
				url: 'http://turnkeymediasolutions.com',
				images: [
					{
						'video': {
							'poster': 'tkm.png',
							'mp4': getVideoFilename('tkm', 'mp4'),
							'webm': getVideoFilename('tkm', 'webm')
						}, 
						'size': 'desktop'
					},
					{
						'image': 'tkm/1.png', 
						'size': 'desktop'
					},
					{
						'image': 'tkm/2.png', 
						'size': 'desktop'
					},
					{
						'image': 'tkm/3.jpg', 
						'size': 'phone'
					},

					{
						'image': 'tkm/4.png', 
						'size': 'phone'
					},
					{
						'image': 'tkm/5.jpg', 
						'size': 'tablet'
					},
					{
						'image': 'tkm/6.png', 
						'size': 'desktop'
					},
					{
						'image': 'tkm/7.png', 
						'size': 'tablet'
					},
				]
			},
			{
				slug: 'mohegan',
				title: 'The Mohegan Sun Drive Competition',
				copy: 'The Mohegan Sun Drive Competition is a interactive golf game with a digital storefront located on Wall Street as the monitor and the user\'s phone as a controller. Users navigate to a mobile web app which records the user\'s swings and communicates information with the storefront via WebSockets. My role in this project was to refresh the web app for a relaunch of the marketing campaign. This includes design updates, bug & cross browser fixes, and usability changes.',
				skills: ['AngularJS', 'WebSockets', 'SPA', 'Front End Development'],
				images: [
					{
						'image': 'mhg/1.jpg', 
						'size': 'full'
					},
					{
						'image': 'mhg/2.jpg', 
						'size': 'phone'
					},
					{
						'image': 'mhg/3.jpg', 
						'size': 'phone'
					},
					{
						'image': 'mhg/4.jpg', 
						'size': 'phone'
					}
				]
			},
			{
				slug: 'nine82',
				title: 'NINE82',
				copy: 'When you are a web based design shop, you need to put your best foot forward when creating your own website. I and my partner in crime started this website with the idea to create a simple yet striking interface that will guide users to contact us.',
				skills: ['WordPress/PHP development','Front End Development','Responsive Design'],
				url: 'http://nine82.com',
				images: [
					{
						'video': {
							'poster': '982.png',
							'mp4': getVideoFilename('982', 'mp4'),
							'webm': getVideoFilename('982', 'webm')
						}, 
						'size': 'desktop'
					},
					{
						'image': 'nine82/1.png', 
						'size': 'tablet'
					},
					{
						'image': 'nine82/2.jpg', 
						'size': 'tablet'
					},
					{
						'image': 'nine82/3.png', 
						'size': 'desktop'
					}
				]
			},
			{
				slug: 'play-it-forward',
				title: 'Kohl\'s Play It Forward',
				copy: 'Kohl\'s Play It Forward is a children\'s education website focused on sports safety. Looking to make their content more engaging, as a team we went through a few initial concepts and landed on a side-scrolling video game inspired homepage. The website doesn\'t stop there, and also has several inside pages with more information.',
				skills: ['WordPress/PHP development','Front End Development','Responsive Design'],
				url: 'http://kohlsplayitforward.org/',
				images: [
					{
						'video': {
							'poster': 'pif.jpg',
							'mp4': getVideoFilename('pif', 'mp4'),
							'webm': getVideoFilename('pif', 'webm')
						}, 
						'size': 'desktop'
					},
					{
						'image': 'pif/1.png', 
						'size': 'tablet'
					},
					{
						'image': 'pif/2.png', 
						'size': 'phone'
					},
					{
						'image': 'pif/3.png', 
						'size': 'phone'
					},
					{
						'image': 'pif/4.jpg', 
						'size': 'desktop'
					},
					{
						'image': 'pif/5.png', 
						'size': 'desktop'
					},
					{
						'image': 'pif/6.png', 
						'size': 'tablet'
					},
					
				]
			},
			{
				slug: 'the-first-academy',
				title: 'The First Academy',
				copy: 'Clocking in at nearly 200 pages, The First Academy is the largest project that I have worked on. The client\'s biggest focus of the website was on a completely custom coded calendar. Users can toggle between two views, export or print events, and can view different months and categories on the AJAX enabled calendar.',
				skills: ['WordPress/PHP development','Front End Development','Responsive Design'],
				url: 'http://thefirstacademy.com',
				images: [
					{
						'video': {
							'poster': 'tfa.png',
							'mp4': getVideoFilename('tfa', 'mp4'),
							'webm': getVideoFilename('tfa', 'webm')
						}, 
						'size': 'desktop'
					},
					{
						'image': 'tfa/1.png', 
						'size': 'desktop'
					},
					{
						'image': 'tfa/2.png', 
						'size': 'tablet'
					},
					{
						'image': 'tfa/3.jpg', 
						'size': 'desktop'
					},
					{
						'image': 'tfa/4.png', 
						'size': 'desktop'
					}
				]
			},
		];

		var getWorkIndex = function (slug) {
			for (var i = 0; i < workData.length; i++) {
				if (workData[i].slug == slug) {
					return i;
				}
			}
			return -1;
		};

		return {
			getWorks: function () {
				return workData;
			},
			getWork: function (slug) {
				var index = getWorkIndex(slug);
				if (index !== -1) {
					return workData[index];
				} else {
					return false;
				}
			},
			getWorkIndex: function (slug) {
				return getWorkIndex(slug);
			},
			getPrevWork: function (slug) {
				var index = getWorkIndex(slug);
				if (index !== -1 && workData[index - 1] !== undefined) {
					return workData[index - 1];
				} else {
					return false;
				}
			},
			getNextWork: function (slug) {
				var index = getWorkIndex(slug);
				if (index !== -1 && workData[index + 1] !== undefined) {
					return workData[index + 1];
				} else {
					return false;
				}
			}
		};
		
	}]);