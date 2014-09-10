<nav class="navigation">
	<ul class="navigation-list <?php echo ($i % 2) ? 'bc' . $i : 'bcr'; ?>">
		<li class="navigation-item" data-panel="I&nbsp;Am">
			<a href="<?php echo $page_base; ?>" class="navigation-item-link ajax ajax--home <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Home</a>
		</li>
		<li class="navigation-item" data-panel="Work">
			<a href="<?php echo $page_base . 'work'; ?>" class="navigation-item-link ajax ajax--home <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Work</a>
		</li>
		<li class="navigation-item" data-panel="Contact">
			<a href="<?php echo $page_base . 'contact'; ?>" class="navigation-item-link ajax ajax--home <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Contact</a>
		</li>
		<li class="navigation-item">
			<a href="<?php echo $page_base . 'resume'; ?>" class="navigation-item-link ajax <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Résumé</a>
		</li>
	</ul>
	<a href="#" class="navigation-button navigation-menu <?php echo ($i % 2) ? 'bcr navigation-button--bc' . $i : 'bc' . $i . ' navigation-button--bcr'; ?>">
		<span class="navigation-hamburger"><span class="navigation-hamburger-center"></span></span>
	</a>
	<a href="<?php echo $page_base; ?>" class="navigation-button ajax ajax--home <?php echo ($i % 2) ? 'bc' . $i . ' navigation-button--bcr' : 'bcr navigation-button--bc' . $i; ?>" data-panel="I&nbsp;Am">
		<?php include('_/img/svg/logo-main.svg'); ?>
	</a>
</nav>