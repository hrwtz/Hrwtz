<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'The Mohegan Sun Drive Competition';
$work['copy'] = 'The Mohegan Sun Drive Competition is a interactive golf game with a digital storefront located on Wall Street as the monitor and the user\'s phone as a controller. Users navigate to a mobile web app which records the user\'s swings and communicates information with the storefront via WebSockets. My role in this project was to refresh the web app for a relaunch of the marketing campaign. This includes design updates, bug & cross browser fixes, and usability changes.';
$work['skills'] = array('AngularJS', 'WebSockets', 'SPA', 'Front End Development');
$work['images'] = array(
	array(
		'image' => $page_base . '_/img/pro/work/mhg/1.jpg', 
		'size'	=> 'full'
	),
	array(
		'image' => $page_base . '_/img/pro/work/mhg/2.jpg', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/mhg/3.jpg', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/mhg/4.jpg', 
		'size'	=> 'phone'
	),
);

?>