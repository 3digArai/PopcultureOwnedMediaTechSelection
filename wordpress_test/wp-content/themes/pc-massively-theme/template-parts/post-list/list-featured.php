<?php
if (!defined('ABSPATH')) {
    exit;
}

$post = $args['post'] ?? null;
?>
<?php if ($post instanceof WP_Post) : ?>
  <article class="hero-feature">
    <p class="post-meta"><?php echo esc_html(get_the_date('', $post)); ?></p>
    <h2 class="hero-feature__title">
      <a href="<?php echo esc_url(get_permalink($post)); ?>">
        <?php echo esc_html(get_the_title($post)); ?>
      </a>
    </h2>
    <p class="post-excerpt"><?php echo esc_html(wp_trim_words(get_the_excerpt($post), 40)); ?></p>
    <a class="post-link" href="<?php echo esc_url(get_permalink($post)); ?>">Read Article</a>
  </article>
<?php else : ?>
  <article class="post-item">
    <p class="post-meta">No post</p>
    <h3 class="post-title">No Featured Post</h3>
    <p class="post-excerpt">注目記事が見つかりませんでした。</p>
  </article>
<?php endif; ?>

