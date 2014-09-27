<div class="dn--s">
	<?php $i = 2; ?>
	<?php $inverse = true; ?>
	<?php require('nav.php'); ?>
</div>

<div class="dn db--s">
	<?php $i = 0; ?>
	<?php $inverse = false; ?>
	<?php require('nav.php'); ?>
</div>


<section class="row row--minwindow">
	<div class="cell cell--half cell--color cell--404left">
		<div class="well">
			<h1 class="h1">404</h1>
		</div>
	</div>
	<div class="cell cell--half cell--mono cell--404right">
		<div class="well">
		<h1 class="h1 h1--right">404</h1>
		<div class="cell cell--s cell-content--left fn">
			<p>The page you're looking for can't be found. Maybe visiting the <a href="<?php echo $page_base; ?>">homepage</a> will help.</p>
		</div>
		</div>
	</div>
</section>