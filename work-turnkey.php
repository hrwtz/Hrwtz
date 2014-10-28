<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'Turnkey Media Solutions';
//$work['description'] = 'Description goes here';
$work['copy'] = 'Turnkey Media Solutions provides in-store music and messaging for their clients. They were looking for a clean and modern site that would focus on their services. To really draw attention to what they do, multiple audio players were created throughout the website. These players give TKM a unique portfolio that is easily accessible to the user.';
$work['skills'] = array('MVCSS', 'HTML5 Audio Players', 'WordPress/PHP development','Front End Development','Responsive Design',);
$work['url'] = 'http://turnkeymediasolutions.com';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => $page_base . '_/video/pro/tkm.png',
			'mp4' => array(
				'1050' => $page_base . '_/video/pro/tkm-1050.mp4', 
				'600' => $page_base . '_/video/pro/tkm-600.mp4', 
			),
			'webm' => array(
				'1050' => $page_base . '_/video/pro/tkm-1050.webm', 
				'600' => $page_base . '_/video/pro/tkm-600.webm', 
			),
		), 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/1.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/2.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/3.jpg', 
		'size'	=> 'phone'
	),

	array(
		'image' => $page_base . '_/img/pro/work/tkm/4.png', 
		'size'	=> 'phone'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/5.jpg', 
		'size'	=> 'tablet'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/6.png', 
		'size'	=> 'desktop'
	),
	array(
		'image' => $page_base . '_/img/pro/work/tkm/7.png', 
		'size'	=> 'tablet'
	),
	
);

?>