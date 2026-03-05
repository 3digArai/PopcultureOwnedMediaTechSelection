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
<body <?php body_class('single-post'); ?>>
<?php wp_body_open(); ?>

<header class="site-hero">
  <div class="site-hero__inner">
    <span class="site-hero__kicker">Article</span>
    <h1 class="site-hero__title"><?php bloginfo('name'); ?></h1>
    <p class="site-hero__desc"><?php bloginfo('description'); ?></p>
  </div>
</header>

<nav class="site-nav">
  <div class="site-nav__inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
  </div>
</nav>

<div class="layout">
  <main class="panel single-article">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <p class="post-meta"><?php echo esc_html(get_the_date()); ?> / <?php the_category(', '); ?></p>
      <h1><?php the_title(); ?></h1>
      <div class="single-content">
        <?php the_content(); ?>
      </div>
    <?php endwhile; endif; ?>
  </main>
</div>

<footer class="site-footer">
  <p>PC Massively Inspired Theme</p>
</footer>

<?php wp_footer(); ?>
</body>
</html>

