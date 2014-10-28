<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp);  
    die();
}

$work = array();
$work['title'] = 'Kohl\'s Play It Forward';
//$work['description'] = 'A side-scrolling inspired website education website focused on sports safety.';
$work['copy'] = 'Kohl\'s Play It Forward is a children\'s education website focused on sports safety. Looking to make their content more engaging, as a team we went through a few initial concepts and landed on a side-scrolling video game inspired homepage. The website doesn\'t stop there, and also has several inside pages with more information.';
$work['skills'] = array('WordPress/PHP development','Front End Development','Responsive Design',);
$work['url'] = 'http://kohlsplayitforward.org/';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => $page_base . '_/video/pro/pif.jpg',
			'mp4' => array(
				'1050' => $page_base . '_/video/pro/pif-1050.mp4', 
				'600' => $page_base . '_/video/pro/pif-600.mp4', 
			),
			'webm' => array(
				'1050' => $page_base . '_/video/pro/pif-1050.webm', 
				'600' => $page_base . '_/video/pro/pif-600.webm', 
			),
		), 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/1.png', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/2.png', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/3.png', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/4.jpg', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/5.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/pif/6.png', 
		'size'	=> 'tablet'
	),
	
);

?>