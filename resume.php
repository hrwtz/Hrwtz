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


<section class="row">
	<div class="well">
		
		<div class="cell cell--m">
			<h2 class="h2 h2--mbl tac">Mike A Hurwitz</h2>

			<h3 class="h3 h3--sub">Cras mattis iudicium purus sit amet fermentum. Fabio vel iudice vincam, sunt in culpa qui officia. Ambitioni dedisse scripsisse iudicaretur. Ullamco laboris nisi ut aliquid ex ea commodi consequat. Plura mihi bona sunt, inclinet, amari petere vellent.</h3>
			
			<div class="section">

				<h4 class="h4 bc2">Experience</h4>
				
				<div class="section-inner">
					<h3 class="h3">Bigeye Agency</h3>
					<p class="p p--h">Lead Developer, Feb 2012 - present</p>
					<p class="p">
						Work closely with art department from concept to completion of project.<br>
						Oversee developer partners to guide and be responsible for their work.<br>
						Creating Responsive Email Newsletter templates and signatures<br>
						Performing maintenance and updates to existing websites and developing new web sites, mostly in WordPress<br>
						Testing and quality control during the website development process<br>
						Ensuring that layout of web content is accessible and logical; recommend improvements as necessary<br>
						Stay on top of latest trends in web development, web design, e-mail design, and social media. Provide recommendations regularly
					</p>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc3">Education</h4>
				
				<div class="section-inner">
					<h3 class="h3">Bachelor of Arts in Digital Media, Information Techonoly Minor</h3>
					<p class="p p--h">University of Central Florida</p>
					<p>2008 - 2011</p>
				</div>

				<div class="section-inner">
					<h3 class="h3">Associates of Arts</h3>
					<p class="p p--h">Indian River Community College</p>
					<p>2007 - 2008</p>
				</div>
			
			</div>

			<div class="section">

				<h4 class="h4 bc4">Skills</h4>
				
				<div class="section-inner clearfix">
					<div class="w-1of3 fl">
						<div class="p p--h">Skills</div>
						<ul class="list">
							<li class="">HTML5</li>
							<li class="">CSS3 with SASS & Compass</li>
							<li class="">javascript, jQuery, ajax, modernizr</li>
							<li class="">Responsive Design</li>
							<li class="">API Integration</li>
						</ul>
					</div>
					<div class="w-1of3 fl">
						<div class="p p--h">Skills</div>
						<ul class="list">
							<li class="">WordPress Theme Development</li>
							<li class="">Website optimization</li>
							<li>Cross Browser Capabilities</li>
							<li class="">LAMP Stack</li>
							<li class="">SEO</li>
							<li>Object Oriented Programming</li>
						</ul>
					</div>
					<div class="w-1of3 fl">
						<div class="p p--h">Tools</div>
						<ul class="list">
							<li class="">Version Control (GIT)</li>
							<li class="">Grunt</li>
							<li class="">Sublime Text</li>
							<li class="">Command Line</li>
							<li class="">PhotoShop</li>
						</ul>
					</div>

				</div>
			
			</div>

			<h3 class="h3 resumeLine">
				<a href="mailto:mike@hrwtz.com" class="resumeLine-link">mike@hrwtz.com</a>
				<span class="resumeLine-dot">•</span>
				<a href="tel:772.678.0778" class="resumeLine-link">772.678.0778</a>
				<span class="resumeLine-iconWrap">
					<a href="" target="_blank" class="resumeLine-icon resumeLine-icon--pdf"><?php echo svg_use('icon-pdf', 'Download PDF', true); ?> </a>
					<a href="javascript:if(window.print)window.print()" class="resumeLine-icon resumeLine-icon--print" ><?php echo svg_use('icon-print', 'Print', true); ?></a>
				</span>
			</h3>


		</div>
	
	</div>
</section>