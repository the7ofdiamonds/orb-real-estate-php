<?php get_header(); ?>
  <section id="real-estate" class="real-estate">
    <h2 class="title">REAL ESTATE</h2>
<div class="card">
<?php

$args = array(
  'taxonomy' => 'property-type',
  'hide_empty' => true
);

 $terms = get_terms( $args );
 
 foreach( $terms as $term ){
   echo '<button><h2>' .$term -> name. '</h2></button>'
   ;
 }
 ?>
</div>

  <?php

    $args = array('post_type'=>array('posts', 'real-estate'));

    $properties = get_posts($args);

    if ( have_posts() ) : while ( have_posts() ) : the_post(); 

    foreach($properties as $property);

  ?>
    <a href="<?php the_permalink(); ?>">
      <div class="card property-card">

        <h3 class='property-address'><?php the_title(); ?></h3>

        <div class="property-featured-image">
          <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
        </div>

        <div class="property-desription-short">
          <p>Property Type: <?php

          $taxonomy = 'property-type';

           $terms = get_the_terms( $post, $taxonomy);
           
           foreach( $terms as $term ){
             echo $term -> name.' ';
           }
           ?></p>
          <p>Bedrooms: <?php echo get_post_meta(get_the_id(), '_property_type', true); ?></p>
          <p>Bathrooms: </p>
          <p>Sqft: </p>
        </div>
      </div>

    </a>                    
    <?php endwhile; else: endif;?>
  </section>
<?php get_footer(); ?>