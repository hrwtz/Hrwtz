<?php 
$content = array(
   '<h2 class="h2">Front End Developer</h2>
	<p class="p">
		Professional Problem Solver<br>
		Maker of the Interwebs<br>
		Amateur Beer Maker<br>
		300 Ring Owner based in Orlando, Florida.<br>
	</p>',
/*
   '<h2 class="h2">I Am A Creator</h2>
    <h3 class="h3">I pride myself in building top-notch websites.</h3>
	<p>With every project comes new challenges, and I make great efforts to find new and creative solutions. Pushing the projects and the web in general forward is what I am passionate about.</p>
	<p>The web has endless potential and I work every day to push new and alternative technologies to use in production</p>',
*/
   '<h2 class="h2">Skills</h2>
	<p>The web is a moving target and it is important to never stop learning. I am constantly looking into tools that can streamline my workflow, along with improving current skills. As any front end developer HTML, CSS, and JavaScript are my bread and butter.</p>
	<p>I am also experienced in the LAMP stack, version control, CSS preprocessors, and the command line. See my <a href="' . $page_base . 'resume" class="ajax">résumé</a> for a more complete list of skills.</p>
	<h3 class="h3">As a web developer, it is vastly important to invest in myself. </h3>',

   '<h2 class="h2">Building usable sites</h2>
	<p class="p">Anyone can take a PSD and make it into a webpage, but it takes much more consideration to create a thoughtful and beautiful experience. I strive to make websites usable and work in real life situations.</p>
	
	<h3 class="h3">Creating websites that focus on usability, performance, and readable code helps me reach this goal.</h3>',

   '<div class="block block--tall block--narrow">
   		<a href="'.$page_base.'work/turnkey" class="block-preview">
   			<div class="block-previewInner bc2"><div class="block-hover"></div>'.svg_use('work-tkm', 'Turnkey Media Solutions').'</div>
   			</a>
   	</div>
    <div class="block block--tall block--long">
    	<div class="block block--half">
    		<a href="'.$page_base.'work/nine82" class="block-preview">
				<div class="block-previewInner bc4"><div class="block-hover"></div>'.svg_use('work-nine82', 'NINE82').'</div>
    		</a>
    	</div>
    	<div class="block block--half">
    		<a href="'.$page_base.'work/play_it_forward" class="block-preview">
    			<div class="block-previewInner bc1"><div class="block-hover"></div>'.svg_use('work-pif', 'Kohl\'s Play It Forward').'</div>
    		</a>
    	</div>
    </div>
    <div class="block block--short block--long">
    	<a href="'.$page_base.'work/the_first_academy" class="block-preview">
			<div class="block-previewInner  bc0"><div class="block-hover"></div>'.svg_use('work-tfa', 'The First Academy').'</div>
    	</a>
    </div>
    <div class="block block--short block--narrow">
    	<a href="'.$page_base.'work/world_design_exchange" class="block-preview">
    		<div class="block-previewInner  bc3"><div class="block-hover"></div>'.svg_use('work-wdx', 'World Design Exchange').'</div>
    	</a>
    </div>',

   '<h2 class="h2">Contact Me</h2>
	<p class="p">
		Mike A Hurwitz <br>
		<a href="mailto:mike@hrwtz.com">mike@hrwtz.com</a><br>
		Orlando, Florida <br>
		<a href="'.$page_base.'resume">Résumé</a>
		
	</p>',
);
?>

<?php $sections = 5; ?>
<?php $section_titles = array('I&nbsp;Am', 'Skills', 'Usability', 'Work', 'Contact'); ?>
<?php for ($i=0; $i < $sections; $i++) : ?>
	<section class="row row--window home" data-panel="<?php echo $section_titles[$i]; ?>">
		<div class="cell cell--half cell--home cell--mono <?php if ( $i % 2 == 1 ) echo 'fr'; ?>">
			<?php // If work section ?>
			<?php if ($i != 3) : ?>
				<div class="table">
					<div class="table-cell table-cell--middle">
			<?php endif; ?>
						<div class="cell cell--s well well--s clearfix <?php echo ( $i % 2 == 1) ? 'cell-content--right' : 'cell-content--left'; ?> <?php if ($section_titles[$i] == 'Work') echo 'block-cell'; ?>">
							<?php if (isset($content[$i])) echo $content[$i]; ?>
						</div>
			<?php if ($i != 3) : ?>
					</div>
				</div>
			<?php endif; ?>

			<div class="navigation-clip navigation-clip--mobile">
				<?php $inverse = ($i % 2); ?>
				<?php require('nav.php'); ?>
			</div>
		</div>
		<div class="cell cell--half cell--home cell--color bc<?php echo $i; ?>">
			
			<?php if ($i ==0) : ?>
				<div class="branding">
					<div class="branding-iconWrap">
						<div class="branding-iconInner">
							<?php echo svg_use('logo-main'); ?>
						</div>
					</div>
					<p class="branding-text">Mike A Hurwitz</p>
				</div>
			<?php else : ?>
				<canvas class="canvas bc<?php echo $i; ?>" id="canvas-<?php echo $i; ?>"></canvas>
			<?php endif; ?>

			<div class="navigation-clip navigation-clip--mobile">
				<?php $inverse = !($i % 2); ?>
				<?php require('nav.php'); ?>
			</div>
		</div>

		<div class="navigation-clip navigation-clip--main">
			<?php $inverse = false; ?>
			<?php require('nav.php'); ?>
			<nav class="navigationSide">
				<ul class="navigationSide-list <?php echo ($i % 2 == 0) ? 'navigation-list--cr navigation-list--bc' . $i : 'navigation-list--bcr navigation-list--c' . $i; ?>">
					<?php for ($k=0; $k < $sections; $k++) : ?>
						<li class="navigationSide-item <?php if ($request_path == strtolower($section_titles[$k])) echo 'active'; ?>" data-panel="<?php echo $section_titles[$k]; ?>">
							<a href="#" class="navigationSide-item-link " >
								<span class="navigationSide-dot"></span>
								<span class="navigationSide-text"><?php echo $section_titles[$k]; ?></span>
							</a>
						</li>
					<?php endfor; ?>
				</ul>
			</nav>
		</div>
	</section>
<?php endfor; ?>