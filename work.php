
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
						<?php include('_/img/svg/work-view.svg'); ?> 
						Launch website
					</a>
				</h3>

			<?php endif; ?>


			<?php if ($work['images']) : ?>

				<div class="tac">

					<?php foreach ($work['images'] as $image) : ?>
						<div class="device device--<?php echo $image['size'] ?>">
							
							<?php if ( isset($image['video']) ) : ?>
							
								<video class="device-image" loop="true" autoplay="autoplay" poster="<?php echo $image['video']['poster']; ?>">
									<?php if ( isset($image['video']['webm']) ) : ?><source type="video/webm" src="<?php echo $image['video']['webm']; ?>"><?php endif; ?>
									<?php if ( isset($image['video']['ogv']) ) : ?><source type="video/ogg" src="<?php echo $image['video']['ogv']; ?>"><?php endif; ?>
									<?php if ( isset($image['video']['mp4']) ) : ?><source type="video/mp4" src="<?php echo $image['video']['mp4']; ?>"><?php endif; ?>
								</video>
							
							<?php else : ?>
							
								<img src="<?php echo $image['image']; ?>" alt="" class="device-image">
							
							<?php endif; ?>
							
							<?php if ( $image['size'] == 'desktop' ) : ?>
							
								<div class="device-buttons"></div>
							
							<?php endif; ?>
						</div>

					<?php endforeach;?>

				</div>

			<?php endif; ?>

		</div>
	</div>
</section>