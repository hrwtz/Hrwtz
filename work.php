
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

						<?php if ( $image['size'] == 'desktop' ) : ?>
						
							<div class="device device-desktop">
								<div class="device-desktop-top">
									<div class="device-desktop-buttons"></div>
								</div>
								<?php if ( isset($image['video']) ) : ?>
									<video class="device-desktop-image" loop="true" autoplay="autoplay" poster="<?php echo $image['video']['poster']; ?>">
										<?php if ( isset($image['video']['webm']) ) : ?><source type="video/webm" src="<?php echo $image['video']['webm']; ?>"><?php endif; ?>
										<?php if ( isset($image['video']['ogv']) ) : ?><source type="video/ogg" src="<?php echo $image['video']['ogv']; ?>"><?php endif; ?>
										<?php if ( isset($image['video']['mp4']) ) : ?><source type="video/mp4" src="<?php echo $image['video']['mp4']; ?>"><?php endif; ?>
									</video>
								<?php else : ?>
									<img src="<?php echo $image['image']; ?>" alt="" class="device-desktop-image">
								<?php endif; ?>
							</div>

						<?php elseif ( $image['size'] == 'phone' || $image['size'] == 'tablet' ) : ?>

							<div class="device device-mobile device-mobile--<?php echo $image['size']; ?>">
								<div class="device-mobile-circle device-mobile-circle--<?php echo $image['size']; ?>1"></div>
								<div class="device-mobile-circle device-mobile-circle--<?php echo $image['size']; ?>2"></div>
								<div class="device-mobile-home device-mobile-home--<?php echo $image['size']; ?>"></div>

								<?php if ( $image['size'] == 'phone' ) : ?>
									<div class="device-mobile-circle device-mobile-circle--phone3"></div>
									<div class="device-mobile-speaker"></div>
								<?php endif; ?>
								
								<div class="device-mobile-padding--<?php echo $image['size']; ?>">
									<?php if ( isset($image['video']) ) : ?>
										<video class="device-desktop-image" loop="true" autoplay="autoplay" poster="<?php echo $image['video']['poster']; ?>">
											<?php if ( isset($image['video']['webm']) ) : ?><source type="video/webm" src="<?php echo $image['video']['webm']; ?>"><?php endif; ?>
											<?php if ( isset($image['video']['ogv']) ) : ?><source type="video/ogg" src="<?php echo $image['video']['ogv']; ?>"><?php endif; ?>
											<?php if ( isset($image['video']['mp4']) ) : ?><source type="video/mp4" src="<?php echo $image['video']['mp4']; ?>"><?php endif; ?>
										</video>
									<?php else : ?>
										<img src="<?php echo $image['image']; ?>" alt="" class="device-mobile-image">
									<?php endif; ?>
								</div>
							</div>

						<?php endif; ?>

					<?php endforeach;?>

				</div>

			<?php endif; ?>

		</div>
	</div>
</section>