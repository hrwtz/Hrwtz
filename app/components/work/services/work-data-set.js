'use strict';
/*global angular: false */
angular.module('hrwtzApp')
	.factory('workDataSet', ['environment', function(environment){
		function getVideoFilename(filename, fileType) {
			if (environment === 'production') {
				var videoSize = screen.width < 600 ? 600 : 1050;
				return filename + '-' + videoSize + '.' + fileType;
			} else {
				return filename + '.mov';
			}
		}

		var workData = [
			{
				slug: 'mivue',
				slugShortened: 'mv',
				title: 'miVUE',
				copy: 'miVUE is an application built on the MEAN stack that allows users to configure multiple CDN based services from either a front end portal or RESTful API. It is integrated with multiple 3rd party and homebrewed services from DNS to streaming delivery to Highwind\'s StrikeTracker. With miVUE, users have access to control content, DNS, origins, streaming applications, accounts, and more. I worked on a part of a small team to complete this product.',
				skills: ['MongoDB', 'Express', 'AngularJS', 'Node.js'],
				images: [
					{
						'image': 'mv/1.png', 
						'size': 'desktop'
					},
					{
						'image': 'mv/2.png', 
						'size': 'desktop'
					},
					{
						'image': 'mv/3.png', 
						'size': 'desktop'
					},
					{
						'image': 'mv/4.png', 
						'size': 'desktop'
					}
				]
			},
			{
				slug: 'campfyre',
				slugShortened: 'cf',
				title: 'Campfyre',
				copy: 'Campfyre is a product that allows you to build channels for popular streaming platforms including Apple TV, ROKU, and Amazon Fire TV. With the application, you can upload video and audio either from a local file or by URL. With the uploaded content, playlists can be created and edited. Finally, once playlists have been created, the platform channel itself can be customized before submitting the channel for review. My involvement was the rebuilding and refactoring of both the API and UI.',
				skills: ['MongoDB', 'Express', 'AngularJS', 'Node.js'],
				images: [
					{
						'image': 'cf/1.png', 
						'size': 'desktop'
					},
					{
						'image': 'cf/2.png', 
						'size': 'desktop'
					},
					{
						'image': 'cf/3.png', 
						'size': 'desktop'
					},
					{
						'image': 'cf/4.png', 
						'size': 'desktop'
					}
				]
			},
			{
				slug: 'mohegan',
				slugShortened: 'mhg',
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
				slug: 'play-it-forward',
				slugShortened: 'pif',
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
				slug: 'turnkey',
				slugShortened: 'tkm',
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
			}
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