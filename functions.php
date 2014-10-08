<?php 
function svg_use($id, $title = NULL){
	global $page_base;/*
	ob_start();
	?>
	<svg class="icon">
	  	<use xlink:href="#<?php echo $id; ?>"></use>
	  	<image xlink:href="<?php echo $page_base . '_/img/svg/' . $id .'.svg'; ?>" width="100%" height="100%" />
	  	<?php if ($title) : ?>
			<title><?php echo $title; ?></title>
		<?php endif; ?>
	</svg>
	<?php
	$output = ob_get_contents();
	ob_end_clean();
	return $output;*/
	include( '_/img/svg/' . $id .'.svg');
}