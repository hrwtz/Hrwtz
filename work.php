
<?php $i = 0; ?>
<?php require('nav.php'); ?>


<?php require('work-nine82.php'); ?>


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

				<?php foreach ($work['images'] as $image) : ?>

					<img src="<?php echo $image; ?>" alt="" class="work-image">

				<?php endforeach;?>

			<?php endif; ?>

		</div>
	</div>
</section>