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

		<div class="cell cell--s work-content">
			
			<?php if ($work['title']) : ?>
				<h2 class="h2 h2--mbl"><?php echo $work['title']; ?></h2>
			<?php endif; ?>


			<?php if ($work['description']) : ?>
				<h3 class="h3"><?php echo $work['description']; ?></h3>
			<?php endif; ?>


			<?php if ($work['copy']) : ?>
				<p class="p"><?php echo $work['copy']; ?></p>
			<?php endif; ?>


			<?php if ($work['skills']) : ?>
				<ul class="work-skills">
					<?php foreach ($work['skills'] as $skill) : ?>
						<li class="work-skill"><?php echo $skill; ?></li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>

		</div>

		<div class="cell">

			<?php if ($work['url']) : ?>

				<h3 class="h3 work-launch">
					<a href="<?php echo $work['url']; ?>" target="_blank">
						<?php echo svg_use('work-view', NULL, true); ?>
						Launch website
					</a>
				</h3>

			<?php endif; ?>


			<?php if ($work['images']) : ?>

				<div class="tac">

					<?php foreach ($work['images'] as $image) : ?>
						<div class="device device--<?php echo $image['size'] ?>">
							
							<?php if ( isset($image['video']) ) : ?>
							
								<video class="device-image" loop="true" autoplay="autoplay" poster="<?php echo $image['video']['poster']; ?>"
									data-mp4-1050="<?php echo $image['video']['mp4']['1050']; ?>"
									data-webm-1050="<?php echo $image['video']['webm']['1050']; ?>"
									data-mp4-600="<?php echo $image['video']['mp4']['600']; ?>"
									data-webm-600="<?php echo $image['video']['webm']['600']; ?>">
								</video>
							
							<?php else : ?>
							
								<img src="<?php echo $image['image']; ?>" alt="" class="device-image">
							
							<?php endif; ?>
							
							<div class="device-buttons"></div>

						</div>

					<?php endforeach;?>

				</div>

			<?php endif; ?>

		</div>
	</div>
</section>