<?php
$page_uri = $_SERVER['PHP_SELF'];
$page_base_tmp = str_replace(basename(__FILE__), '', $page_uri);
if(empty($access)) {
    header("location:" . $page_base_tmp);  
    die();
}
?>
<?php $i = 0; ?>
<?php require('nav.php'); ?>
<?php global $page_base; ?>

<section class="row">
	<div class="well">
		
		<div class="cell cell--m">
			<h2 class="h2 h2--mbl tac">Mike A Hurwitz</h2>

			<?php /*<h3 class="h3 h3--sub">Cras mattis iudicium purus sit amet fermentum. Fabio vel iudice vincam, sunt in culpa qui officia. Ambitioni dedisse scripsisse iudicaretur. Ullamco laboris nisi ut aliquid ex ea commodi consequat. Plura mihi bona sunt, inclinet, amari petere vellent.</h3>*/ ?>
			
			<div class="section">

				<h4 class="h4 bc2">Experience</h4>
				
				<div class="section-inner">
					<h3 class="h3"><a href="http://monstermedia.net" target="_blank">Monster Media</a></h3>
					<p class="p p--h">Web Developer, Dec 2014 - Sep 2015</p>
					<ul class="list p">
						<li>Expand code base and add new functionality to existing web applications, using various technologies including CakePHP, WordPress, and AngularJS.</li>
						<li>Rebuild from ground up a complex CMS used to build, customize, moderate, and manage SWF applications.</li>
						<li>Work on web applications and mobile sites of varying function, from custom internal CMS's to a client facing interactive mobile game.</li>
						<li>Quickly understand complex pre-existing systems to investigate and resolve backlogged bugs.</li>
						<li>Assist with production tasks such as testing, debugging and QA.</li>
						<li>Monitor latest trends in web development, web design, and user experience.</li>
					</ul>
				</div>

				<div class="section-inner">
					<h3 class="h3"><a href="http://bigeyeagency.com" target="_blank">BIGEYE Agency</a></h3>
					<p class="p p--h">Web Developer, Mar 2012 - Dec 2014</p>
					<ul class="list p">
						<li>BIGEYE’s sole web developer responsible for all web projects, including <a href="<?php echo $page_base . 'work/turnkey'; ?>">Turnkey Media Solutions</a>, <a href="<?php echo $page_base . 'work/play-it-forward'; ?>">Kohl's Play it Forward</a>, and <a href="<?php echo $page_base . 'work/the-first-academy'; ?>">The First Academy</a>.</li>
						<li>Develop new creative websites while maintaining and improving existing client websites.</li>
						<li>Collaborate with art department on major projects from brain storming to completion as a lead developer advocating for consistency, the user experience, and pushing the envelope.</li>
						<li>Oversee contract developers to ensure quality projects are delivered to the client on time.</li>
						<li>Produce web development workflow process, from defining deployment process to creating a starter front end template.</li>
					</ul>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc3">Education</h4>
				
				<div class="section-inner">
					<h3 class="h3">University of Central Florida</h3>
					<p class="p p--h">Bachelor of Arts in Digital Media (Web Design Track), Information Technology Minor, 2011</p>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc4">Skills</h4>
				
				<div class="section-inner clearfix">
					<div class="g">
						<div class="p clearfix">
							<div class="g-b g-b--1of4 g-b--s--1of1 p--h">Languages & Databases</div>
							<div class="g-b g-b--3of4 g-b--s--1of1">HTML5, CSS3/SASS, JavaScript, PHP, MySQL</div>
						</div>

						<div class="p clearfix">
							<div class="g-b g-b--1of4 g-b--s--1of1 p--h">Libraries, CMS's, & Frameworks</div>
							<div class="g-b g-b--3of4 g-b--s--1of1">WordPress Theme Development, jQuery, CakePHP</div>
						</div>

						<div class="p clearfix">
							<div class="g-b g-b--1of4 g-b--s--1of1 p--h">Tools</div>
							<div class="g-b g-b--3of4 g-b--s--1of1">Git, Grunt, Command Line, Photoshop, Compass</div>
						</div>

						<div class="p clearfix">
							<div class="g-b g-b--1of4 g-b--s--1of1 p--h">Misc</div>
							<div class="g-b g-b--3of4 g-b--s--1of1">Responsive Design, Website Optimization, Cross Browser Compatibility, LAMP Stack, MVC, API Integration, Modular Programming</div>
						</div>
					</div>
				</div>
			
			</div>

			<h3 class="h3 resumeLine">
				<span class="resumeLine-infoWrap">
					<a href="mailto:mike@hrwtz.com" class="resumeLine-link">mike@hrwtz.com</a>
					<span class="resumeLine-dot">•</span>
					<a href="tel:772.678.0778" class="resumeLine-link">772.678.0778</a>
					<span class="print-only"><br>hrwtz.com <span class="resumeLine-dot">•</span> Orlando, Florida</span>
				</span>
				<span class="resumeLine-iconWrap">
					<a href="<?php echo $page_base . '_/misc/resume.pdf'; ?>" download="Mike A Hurwitz - Front End Developer.pdf" class="resumeLine-icon resumeLine-icon--pdf"><?php echo svg_use('icon-pdf', 'Download PDF', true); ?> </a>
					<a href="javascript:if(window.print)window.print()" class="resumeLine-icon resumeLine-icon--print" ><?php echo svg_use('icon-print', 'Print', true); ?></a>
				</span>
			</h3>


		</div>
	
	</div>
</section>