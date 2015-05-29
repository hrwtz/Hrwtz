<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'World Design Exhange';
//$work['description'] = 'Description goes here';
$work['copy'] = 'World Design Exchange came with a need for a website with a very tight timeline of less than a month (Not to mention the rest of the brand being developed in that same timeframe). Working on this timeline, we worked as a team to deliver an image-driven, sophisticated website for the client.';
$work['skills'] = array('WordPress/PHP development','Front End Development','Responsive Design',);
$work['images'] = array(
	array(
		'video' => array(
			'poster' => $page_base . '_/video/pro/wdx.png',
			'mp4' => array(
				'1050' => $page_base . '_/video/pro/wdx-1050.mp4', 
				'600' => $page_base . '_/video/pro/wdx-600.mp4', 
			),
			'webm' => array(
				'1050' => $page_base . '_/video/pro/wdx-1050.webm', 
				'600' => $page_base . '_/video/pro/wdx-600.webm', 
			),
		), 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/1.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/2.jpg', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/3.png', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/4.jpg', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/5.jpg', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/wdx/6.jpg', 
		'size'	=> 'tablet'
	),
);

?>