<?php
if (!defined('ABSPATH')) {
    exit;
}

$title = is_string($args['title'] ?? null) ? $args['title'] : 'Posts';
$query = $args['query'] ?? null;
$with_pagination = !empty($args['with_pagination']);

$uses_custom_query = $query instanceof WP_Query;
if (!$uses_custom_query) {
    global $wp_query;
    $query = $wp_query;
}
?>
<h2 class="feed-title"><?php echo esc_html($title); ?></h2>
<?php if ($query instanceof WP_Query && $query->have_posts()) : ?>
  <?php while ($query->have_posts()) : $query->the_post(); ?>
    <article class="post-item post-row">
      <a class="post-thumb-wrap" href="<?php the_permalink(); ?>">
        <?php if (has_post_thumbnail()) : ?>
          <?php the_post_thumbnail('medium', ['class' => 'post-thumb', 'loading' => 'lazy']); ?>
        <?php else : ?>
          <span class="post-thumb post-thumb--empty">No Image</span>
        <?php endif; ?>
      </a>
      <div>
        <p class="post-meta"><?php echo esc_html(get_the_date()); ?></p>
        <h3 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p class="post-excerpt"><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p>
        <a class="post-link" href="<?php the_permalink(); ?>">Read Article</a>
      </div>
    </article>
  <?php endwhile; ?>
  <?php if ($with_pagination) : ?>
    <?php the_posts_pagination(); ?>
  <?php endif; ?>
<?php else : ?>
  <article class="post-item">
    <p class="post-meta">No post</p>
    <h3 class="post-title">No Posts Yet</h3>
    <p class="post-excerpt">投稿を作成するとここに表示されます。</p>
  </article>
<?php endif; ?>
<?php if ($uses_custom_query) : ?>
  <?php wp_reset_postdata(); ?>
<?php endif; ?>

