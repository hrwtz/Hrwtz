<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'NINE82';
//$work['description'] = 'Description goes here';
$work['copy'] = 'When you are a web based design shop, you need to put your best foot forward when creating your own website. Me and my partner in crime started this website with the idea to create a simple yet striking interface that will guide users to contact us.';
$work['skills'] = array('WordPress/PHP development','Front End Development','Responsive Design',);
$work['url'] = 'http://nine82.com';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => $page_base . '_/video/pro/982.png',
			'mp4' => array(
				'1050' => $page_base . '_/video/pro/982-1050.mp4', 
				'600' => $page_base . '_/video/pro/982-600.mp4', 
			),
			'webm' => array(
				'1050' => $page_base . '_/video/pro/982-1050.webm', 
				'600' => $page_base . '_/video/pro/982-600.webm', 
			),
		), 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/nine82/1.png', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/nine82/2.jpg', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/nine82/3.png', 
		'size'	=> 'desktop'
	),
);

?>