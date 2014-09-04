<?php require('header.php'); ?>

<?php 
$content = array(
   '<h2 class="h2">Front End Developer</h2>
	<p class="p">
		Professional Problem Solver<br>
		Maker of the Interwebs<br>
		Amateur Beer Maker<br>
		300 Ring Owner based in Orlando, Florida.<br>
	</p>',

   '<h2 class="h2">I Am A Creator</h2>
    <h3 class="h3">I pride myself in building top-notch websites.</h3>
	<p>With every project comes new challenges, and I make great efforts to find new and creative solutions. Pushing the projects and the web in general forward is what I am passionate about.</p>
	<p>The web has endless potential and I work every day to push new and alternative technologies to use in production</p>',

   '<h2 class="h2">Learning / Skills</h2>
	<p>The web is a moving target and it is important to never stop learning. I am constantly looking into tools that can streamline my workflow, along with improving current skills. As any front end developer HTML, CSS, and JavaScript are my bread and butter.</p>
	<p>I am also experienced in the LAMP stack, version control, CSS preprocessors, and the command line. See my résumé for a more complete list of skills.</p>
	<h3 class="h3">As a web developer, it is vastly important to invest in myself. </h3>',

   '<h2 class="h2">Usability / Experience Building usable sites</h2>
	<p class="p">Anyone can take a PSD and make it into a webpage, but it takes much more consideration to create a thoughtful and beautiful experience. I strive to make websites usable and work in real life situations.</p>
	<p class="p">I work towards this goal by creating websites that work across all platforms and sizes, maximize page load speed, and following accessibility standards.</p>
	<h3 class="h3">Alternative: Creating websites that focus on usability, performance, and readable code helps me reach this goal.</h3>',

   '<h2 class="h2">Contact</h2>
	<p class="p">
		Mike A Hurwitz <br>
		<a href="mailto:mike@mike.com">mike@mikeahurwitz.com</a><br>
		Orlando, Florida
	</p>',
);
?>


		<?php $sections = 5; ?>
		<?php for ($i=0; $i < $sections; $i++) : ?>
			<section class="row row--window">
				<?php if ( $i % 2 == 1 ) : ?>
					<div class="cell cell--half cell--color">
						<canvas class="canvas bc<?php echo $i; ?>" id="canvas-<?php echo $i; ?>"></canvas>
					</div>
				<?php endif; ?>
				<div class="cell cell--half cell--mono">
					<div class="table">
						<div class="table-cell table-cell--middle">
							<div class="cell cell--s <?php echo ( $i % 2 == 1) ? 'cell-content--right' : 'cell-content--left'; ?>">
								<?php if (isset($content[$i])) echo $content[$i]; ?>
							</div>
						</div>
					</div>
				</div>
				<?php if ( $i % 2 == 0 ) : ?>
					<div class="cell cell--half cell--color">
						<canvas class="canvas bc<?php echo $i; ?>" id="canvas-<?php echo $i; ?>"></canvas>
					</div>
				<?php endif; ?>

				<div class="navigation-clip">
					<?php require('nav.php'); ?>
					<nav class="navigationSide">
						<ul class="navigationSide-list">
							<?php for ($k=0; $k < $sections; $k++) : ?>
								<li class="navigationSide-item">
									<a href="#" class="navigationSide-item-link">
										<span class="navigationSide-dot"></span>
										<span class="navigationSide-text">Work</span>
									</a>
								</li>
							<?php endfor; ?>
						</ul>
					</nav>
				</div>
			</section>
		<?php endfor; ?>


	
	<?php require('footer.php'); ?>