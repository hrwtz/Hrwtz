<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'World Design Exhange';
$work['description'] = 'Description goes here';
$work['copy'] = '<p class="p">With every project comes new challenges, and I make great efforts to find new and creative solutions. Pushing the projects and the web in general forward is what I am passionate about. The web has endless potential and I work every day to push new and alternative technologies to use in production</p>';
$work['skills'] = array('Skills name','Other skill name','Skill');
$work['url'] = 'http://worlddesignexchange.com/';
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