<?php get_header();?>
    <section id='real-estate' class='real-estate'>
        <h2 class="title"><?php the_title(); ?></h2>

        <?php

        get_post();

        if ( have_posts() ) : while ( have_posts() ) : the_post();
        ?>

            <div class="property-detail-card card">
                
                <div class="property-gallery">
                    <?php echo get_post_gallery(); ?>
                </div>

                <div class="property-description">
                    <p>
                        <?php echo wp_strip_all_tags( get_the_content() ); ?>
                    </p>                
                </div>

                <div class="property-features">
                    <ul class="feature-list">
                        <li class="feature">
                            <?php echo get_post_meta(get_the_ID(), 'feature_1', true); ?>
                        </li>
                        <li class="feature">
                            <?php echo get_post_meta(get_the_ID(), 'feature_2', true); ?>
                        </li>
                        <li class="feature">
                            <?php echo get_post_meta(get_the_ID(), 'feature_3', true); ?>
                        </li>
                    </ul>
                </div>
            </div>
        <?php endwhile; else: endif;?>
    </section>
<?php get_footer();?>