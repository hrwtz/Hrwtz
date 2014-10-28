<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'The First Academy';
//$work['description'] = 'Description goes here';
$work['copy'] = 'Clocking in at nearly 200 pages, The First Academy is the largest project that I have worked on. The client\'s biggest focus of the website was on a completely custom coded calendar. Users can toggle between two views, export or print events, and can view different months and categories on the AJAX enabled calendar.';
$work['skills'] = array('WordPress/PHP development','Front End Development','Responsive Design',);
$work['url'] = 'http://thefirstacademy.com';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => $page_base . '_/video/pro/tfa.png',
			'mp4' => array(
				'1050' => $page_base . '_/video/pro/tfa-1050.mp4', 
				'600' => $page_base . '_/video/pro/tfa-600.mp4', 
			),
			'webm' => array(
				'1050' => $page_base . '_/video/pro/tfa-1050.webm', 
				'600' => $page_base . '_/video/pro/tfa-600.webm', 
			),
		), 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tfa/1.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tfa/2.png', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tfa/3.jpg', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tfa/4.png', 
		'size'	=> 'desktop'
	),
);

?>