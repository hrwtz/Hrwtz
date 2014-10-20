<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp); 
    die();
}



function svg_use($id, $title = NULL, $fallback = NULL){
	global $page_base;
	ob_start();
	?>
	<svg class="icon icon--svg">
	  	<use xlink:href="#<?php echo $id; ?>"></use>
	  	
	  	<?php if ($title) : ?>
			<title><?php echo $title; ?></title>
		<?php endif; ?>

	</svg>

	<?php if ($fallback) : ?>
		<?php if ($fallback === true) : $fallback = $id; endif; ?>

		<div class="icon icon--fallback icon--fallback--<?php echo $fallback; ?> th">
			<?php echo $title; ?>
		</div>

	<?php endif; ?>

	<?php
	$output = ob_get_contents();
	ob_end_clean();
	return $output;
}