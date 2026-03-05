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

<header class="site-hero">
  <div class="site-hero__inner">
    <span class="site-hero__kicker">Post Archive</span>
    <h1 class="site-hero__title">投稿一覧</h1>
    <p class="site-hero__desc">すべての公開投稿を時系列で表示します。</p>
  </div>
</header>

<nav class="site-nav">
  <div class="site-nav__inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Main</a>
    <a href="<?php echo esc_url(pc_massively_posts_url()); ?>">投稿一覧</a>
  </div>
</nav>

<div class="layout">
  <main class="panel feed">
    <?php get_template_part('template-parts/post-list/list', 'simple', ['title' => 'All Posts', 'with_pagination' => true]); ?>
  </main>

  <aside class="panel sidebar">
    <h3>Guide</h3>
    <ul>
      <li>ここは投稿のアーカイブページです。</li>
      <li>固定ページを使わず、投稿一覧に直接アクセスできます。</li>
    </ul>
  </aside>
</div>

<footer class="site-footer">
  <p>PC Massively Inspired Theme</p>
</footer>

<?php wp_footer(); ?>
</body>
</html>
