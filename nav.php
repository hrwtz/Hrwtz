<nav class="navigation">
	<ul class="navigation-list <?php echo ($i % 2) ? 'bc' . $i : 'bcr'; ?>">
		<li class="navigation-item"><a href="index.php" class="navigation-item-link <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Home</a></li>
		<li class="navigation-item"><a href="index.php#work" class="navigation-item-link <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Work</a></li>
		<li class="navigation-item"><a href="index.php#contact" class="navigation-item-link <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Contact</a></li>
		<li class="navigation-item"><a href="index.php#contact" class="navigation-item-link <?php echo ($i % 2) ? 'navigation-item-link--tcr' : 'navigation-item-link--tc' . $i; ?>">Resume</a></li>
	</ul>
	<a href="#" class="navigation-button navigation-menu <?php echo ($i % 2) ? 'bcr navigation-button--bc' . $i : 'bc' . $i . ' navigation-button--bcr'; ?>">
		<span class="navigation-hamburger"><span class="navigation-hamburger-center"></span></span>
	</a>
	<a href="index.php" class="navigation-button <?php echo ($i % 2) ? 'bc' . $i . ' navigation-button--bcr' : 'bcr navigation-button--bc' . $i; ?>">
		<?php include('_/img/svg/logo-main.svg'); ?>
	</a>
</nav>