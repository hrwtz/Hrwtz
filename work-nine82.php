<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'NINE82';
$work['description'] = 'Description goes here';
$work['copy'] = '<p class="p">With every project comes new challenges, and I make great efforts to find new and creative solutions. Pushing the projects and the web in general forward is what I am passionate about. The web has endless potential and I work every day to push new and alternative technologies to use in production</p>';
$work['skills'] = array('Skills name','Other skill name','Skill');
$work['url'] = 'http://nine82.com';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => '',
			'webm' => '',
			'ogg' => '',
			'mp4' => $page_base . '_/video/src/982.mp4', 
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