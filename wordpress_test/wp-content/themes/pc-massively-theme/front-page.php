<?php
if (!defined('ABSPATH')) {
    exit;
}

$theme_hero_image_id = (int) get_theme_mod('pc_massively_hero_image_id', 0);
$theme_hero_bg = $theme_hero_image_id > 0 ? wp_get_attachment_image_url($theme_hero_image_id, 'full') : '';
$hero_bg = is_string($theme_hero_bg) && $theme_hero_bg !== '' ? $theme_hero_bg : '';

$has_static_front = get_option('show_on_front') === 'page' && (int) get_option('page_on_front') > 0;
$front_page_id = (int) get_option('page_on_front');
$front_page_post = $has_static_front ? get_post($front_page_id) : null;
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

<header class="site-hero" <?php if ($hero_bg) : ?>style="background-image: linear-gradient(var(--hero-overlay), var(--hero-overlay)), url('<?php echo esc_url($hero_bg); ?>'); background-size: cover; background-position: center;"<?php endif; ?>>
  <div class="site-hero__inner">
    <span class="site-hero__kicker">Pop Culture Owned Media</span>
    <h1 class="site-hero__title"><?php bloginfo('name'); ?></h1>
    <p class="site-hero__desc"><?php bloginfo('description'); ?></p>
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
    <?php if ($front_page_post instanceof WP_Post) : ?>
      <section class="main-page-content">
        <?php echo apply_filters('the_content', (string) $front_page_post->post_content); ?>
      </section>
    <?php else : ?>
      <section class="main-page-content">
        <h2>Mainページの設定が未完了です</h2>
        <p>固定ページを1つ作成し、以下のショートコードを配置してください。</p>
        <pre>[pc_featured_post]
[pc_post_list title="Latest Posts" posts_per_page="6"]</pre>
        <p>その後、設定 → 表示設定 でホームページにその固定ページを指定します。</p>
      </section>
    <?php endif; ?>
  </main>

  <aside class="panel sidebar">
    <h3>About</h3>
    <ul>
      <li>表示は固定ページ本文のショートコードで制御します。</li>
      <li>レイアウト変更はショートコードの並び替えで対応できます。</li>
      <li><a href="<?php echo esc_url(pc_massively_posts_url()); ?>">投稿一覧を見る</a></li>
    </ul>
  </aside>
</div>

<footer class="site-footer">
  <p>PC Massively Inspired Theme</p>
</footer>

<?php wp_footer(); ?>
</body>
</html>
