<!DOCTYPE html>

<!--[if lt IE 7 ]> <html class="ie ie6 no-js"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 no-js"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 no-js"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 no-js"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js"><!--<![endif]-->

<head>
	<meta charset="UTF-8">
	
	<?php // Force latest IE rendering engine and chrome fram ?>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
	<title></title>
	
	<?php // Meta SEO Information ?>
	<meta name="title" content="">
	<meta name="description" content="">
	<meta name="author" content="Mike A Hurwitz">
	
	<?php // Mobile Friendly ?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	
	<?php // Favicon ?>
	<link rel="shortcut icon" href="_/img/favicon.ico">

	<?php // CSS ?>
	<link href="_/css/application.css" rel=stylesheet />
	
</head>

<body>
	<main>
		<?php for ($i=0; $i < 5; $i++) : ?>
			<div class="row row--window">
				<?php if ( $i % 2 == 1 ) : ?>
					<div class="cell cell--color">
						<canvas class="canvas bc<?php echo $i; ?>" id="canvas-<?php echo $i; ?>"></canvas>
					</div>
				<?php endif; ?>
				<div class="cell cell--mono">
					<div class="content table">
						<div class="table-cell table-cell--middle">
							<h1 class="content-title">Front End Developer</h1>
							<p class="content-text">
								Professional Problem Solver<br>
								Maker of the Interwebs<br>
								Amateur Beer Maker<br>
								300 Ring Owner based in Orlando, Florida.<br>
							</p>
						</div>
					</div>
				</div>
				<?php if ( $i % 2 == 0 ) : ?>
					<div class="cell cell--color">
						<canvas class="canvas bc<?php echo $i; ?>" id="canvas-<?php echo $i; ?>"></canvas>
					</div>
				<?php endif; ?>

				<div class="navigation-clip">
					<nav class="navigation">
						<ul class="navigation-list">
							<li class="navigation-item"><a href="#" class="navigation-item-link">Who</a></li>
							<li class="navigation-item"><a href="#" class="navigation-item-link">Skills</a></li>
							<li class="navigation-item"><a href="#" class="navigation-item-link">Work</a></li>
							<li class="navigation-item"><a href="#" class="navigation-item-link">Contact</a></li>
						</ul>
						<a href="#" class="navigation-button navigation-menu <?php echo ($i % 2) ? 'bcr navigation-button--bc' . $i : 'bc' . $i . ' navigation-button--bcr'; ?>">
							<span class="navigation-hamburger"><span class="navigation-hamburger-center"></span></span>
						</a>
						<a href="#" class="navigation-button <?php echo ($i % 2) ? 'bc' . $i . ' navigation-button--bcr' : 'bcr navigation-button--bc' . $i; ?>">
							<?php include('_/img/svg/logo-main.svg'); ?>
						</a>
					</nav>
				</div>
			</div>
		<?php endfor; ?>
	</main>

	
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="_/js/src/common.js"></script>
</body>
</html>