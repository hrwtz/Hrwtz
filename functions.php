<?php 
function svg_use($id, $title = NULL){
	ob_start();
	?>
	<svg class="icon">
	  	<use xlink:href="#<?php echo $id; ?>"></use>
	  	<?php if ($title) : ?>
			<title><?php echo $title; ?></title>
		<?php endif; ?>
	</svg>
	<?php
	$output = ob_get_contents();
	ob_end_clean();
	return $output;
}