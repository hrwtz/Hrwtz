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
					<h3 class="h3"><a href="http://bigeyeagency.com" target="_blank">BIGEYE Agency</a></h3>
					<p class="p p--h">Developer, Mar 2012 - present</p>
					<p class="p">
						BIGEYE’s sole web developer responsible for all web projects, including <a href="<?php echo $page_base . 'work/turnkey'; ?>">Turnkey Media Solutions</a>, <a href="<?php echo $page_base . 'work/play-it-forward'; ?>">Kohl's Play it Forward</a>, and <a href="<?php echo $page_base . 'work/the-first-academy'; ?>">The First Academy</a>.
						Develop new creative websites while maintaining and improving existing client websites.
						Collaborate with art department on major projects from brain storming to completion as a lead developer advocating for the user experience, consistency, and pushing the envelope.
						Oversee contract developers to ensure quality projects are delivered to the client on time.
						Produce web development workflow process, from defining deployment process to creating base front end template.
						Monitor latest trends in web development, web design, email design, and user experience.
					</p>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc3">Education</h4>
				
				<div class="section-inner">
					<h3 class="h3">University of Central Florida</h3>
					<p class="p p--h">Bachelor of Arts in Digital Media (Web Design Track), Information Techonoly Minor, 2011</p>
				</div>

				<div class="section-inner">
					<h3 class="h3">Indian River Community College</h3>
					<p class="p p--h">Associates of Arts, 2008</p>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc4">Skills</h4>
				
				<div class="section-inner clearfix">
					<div class="w-2of3 fl">
						<div class="p p--h">Skills</div>
						<ul class="list list--half">
							<li>HTML5</li>
							<li>CSS3 with SASS & Compass</li>
							<li>JavaScript, jQuery</li>
							<li>PHP</li>
							<li>MySQL</li>
							<li>WordPress Theme Development</li>
						</ul>
						<ul class="list list--half">
							<li>Responsive Design</li>
							<li>Website optimization</li>
							<li>Cross Browser Compatability</li>
							<li>API Integration</li>
							<li>LAMP Stack</li>
							<li>SEO</li>
							<li>Modular Programming</li>
						</ul>
					</div>
					<div class="w-1of3 fl">
						<div class="p p--h">Tools</div>
						<ul class="list list--half">
							<li>Git</li>
							<li>Grunt</li>
							<li>Sublime Text</li>
							<li>Command Line</li>
							<li>PhotoShop</li>
						</ul>
					</div>

				</div>
			
			</div>

			<h3 class="h3 resumeLine">
				<span class="resumeLine-infoWrap">
					<a href="mailto:mike@hrwtz.com" class="resumeLine-link">mike@hrwtz.com</a>
					<span class="resumeLine-dot">•</span>
					<a href="tel:772.678.0778" class="resumeLine-link">772.678.0778</a>
					<span class="print-only"><br>Orlando, Florida</span>
				</span>
				<span class="resumeLine-iconWrap">
					<a href="" target="_blank" class="resumeLine-icon resumeLine-icon--pdf"><?php echo svg_use('icon-pdf', 'Download PDF', true); ?> </a>
					<a href="javascript:if(window.print)window.print()" class="resumeLine-icon resumeLine-icon--print" ><?php echo svg_use('icon-print', 'Print', true); ?></a>
				</span>
			</h3>


		</div>
	
	</div>
</section>