<section class="commercial">
    <h2 class="title"><?php the_title(); ?></h2>
    <div class="content">
        <?php

            $args = array('post_type'=>array('posts', 'real_estate'), 'category_name' => 'commercial');

            query_posts($args);

            if ( have_posts() ) : while ( have_posts() ) : the_post();

            ?>	
            <div class="card">
                <h3><?php the_title(); ?></h3>
                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?>
                </a>
                <?php the_excerpt(); ?>
            </div>
        <?php endwhile; else: endif;?>
    </div>
</section>