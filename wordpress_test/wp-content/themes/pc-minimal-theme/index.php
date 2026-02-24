<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
  <div class="container">
    <h1 class="site-title"><?php bloginfo('name'); ?></h1>
    <p><?php bloginfo('description'); ?></p>
  </div>
</header>
<main class="container">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article class="post-card">
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <div class="post-meta"><?php echo esc_html(get_the_date()); ?></div>
        <div><?php the_excerpt(); ?></div>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <article class="post-card">
      <h2>No posts yet</h2>
      <p>投稿を作成するとここに表示されます。</p>
    </article>
  <?php endif; ?>
</main>
<footer class="site-footer">
  <div class="container">PC Minimal Theme Demo</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
