<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}

$work = array();
$work['title'] = 'The First Academy';
$work['description'] = 'Description goes here';
$work['copy'] = '<p class="p">With every project comes new challenges, and I make great efforts to find new and creative solutions. Pushing the projects and the web in general forward is what I am passionate about. The web has endless potential and I work every day to push new and alternative technologies to use in production</p>';
$work['skills'] = array('Skills name','Other skill name','Skill');
$work['url'] = 'http://thefirstacademy.com';
$work['images'] = array(
	array(
		'video' => array(
			'poster' => '',
			'webm' => '',
			'ogg' => '',
			'mp4' => $page_base . '_/video/src/tfa.mp4', 
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