<?php $conditional = (isset($inverse) && $inverse == true) ? ($i % 2 == 0) : ($i % 2); ?>

<nav class="navigation">
	<ul class="navigation-list <?php echo ($conditional) ? 'bc' . $i : 'bcr'; ?>">
		<li class="navigation-item" data-panel="I&nbsp;Am">
			<a href="<?php echo $page_base; ?>" class="navigation-item-link ajax ajax--home <?php echo ($conditional) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Home</a>
		</li>
		<li class="navigation-item" data-panel="Work">
			<a href="<?php echo $page_base . 'work'; ?>" class="navigation-item-link ajax ajax--home <?php echo ($conditional) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Work</a>
		</li>
		<li class="navigation-item" data-panel="Contact">
			<a href="<?php echo $page_base . 'contact'; ?>" class="navigation-item-link ajax ajax--home <?php echo ($conditional) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Contact</a>
		</li>
		<li class="navigation-item">
			<a href="<?php echo $page_base . 'resume'; ?>" class="navigation-item-link ajax <?php echo ($conditional) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Résumé</a>
		</li>
	</ul>
	<a href="#" class="navigation-button navigation-menu <?php echo ($conditional) ? 'bcr navigation-button--bc' . $i : 'bc' . $i . ' navigation-button--bcr'; ?>">
		<span class="navigation-hamburger"><span class="navigation-hamburger-center"></span></span>
	</a>
	<a href="<?php echo $page_base; ?>" class="navigation-button ajax ajax--home <?php echo ($conditional) ? 'bc' . $i . ' navigation-button--bcr' : 'bcr navigation-button--bc' . $i; ?>" data-panel="I&nbsp;Am">
		<?php echo svg_use('logo-main'); ?>
	</a>
</nav>