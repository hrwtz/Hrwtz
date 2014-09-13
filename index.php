<?php 
// Define variables
$is_secondary = false;
$is_404 = false;
$load_pages = array();
$is_ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

// Define Available Pages
$pages = array(
	'skills' => 'home',
	'usability' => 'home',
	'work' => 'home',
	'contact' => 'home',
	'resume' => 'resume'
);
$pages_secondary = array(
	'work' => array(
		'nine82', 
		'turnkey'
	),
);

// Get base path for project
$page_uri = $_SERVER['PHP_SELF'];
$page_base = str_replace(basename(__FILE__), '', $page_uri);

// Get request path minus the base
$request_path = str_replace($page_base, '', $_SERVER['REQUEST_URI']);

// Remove trailing slashes
$request_path = rtrim($request_path, '/');

// If request path has single subdirectory, 
// mark as so and make request path an array
if ( substr_count($request_path, '/') == 1 ):
	$request_path = explode('/', $request_path);
	$is_secondary = true;
endif;

// If has subdirectory
if ( $is_secondary ) :
	// If page is in secondary array put it in load array
	if ( in_array($request_path[1], $pages_secondary[$request_path[0]]) ) :
		// Load main page and single page
		$load_pages[] = $request_path[0] . '-' . $request_path[1] . '.php';
		$load_pages[] = $request_path[0] . '.php';
	endif;
// If at root of project load homepage
elseif ( !$request_path ) :
	$load_pages[] = 'home.php';
// If no subdirectory
else :
	// Put in pages to load
	if ( isset($pages[$request_path]) ) :
		$load_pages[] = $pages[$request_path] . '.php';
	endif;
endif;

// Load page up!

if (!$is_ajax)
	require('header.php');

// Load in all required pages
if ( $load_pages ) :
	foreach ($load_pages as $page) :
		require($page);	
	endforeach;
// If no pages to load, load 404
else: 
	require('404.php');
endif; 

if (!$is_ajax)
	require('footer.php');