<?php
/**
 * Theme functions.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_setup_theme', function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
});

add_action('wp_enqueue_scripts', function (): void {
    wp_enqueue_style(
        'pc-massively-theme-style',
        get_stylesheet_uri(),
        [],
        wp_get_theme()->get('Version')
    );
});

add_action('customize_register', function (WP_Customize_Manager $wp_customize): void {
    $wp_customize->add_section('pc_massively_hero_section', [
        'title' => 'Hero Settings',
        'priority' => 30,
    ]);

    $wp_customize->add_setting('pc_massively_hero_image_id', [
        'default' => 0,
        'sanitize_callback' => 'absint',
    ]);

    $wp_customize->add_control(new WP_Customize_Media_Control(
        $wp_customize,
        'pc_massively_hero_image_id',
        [
            'label' => 'Hero Background Image',
            'section' => 'pc_massively_hero_section',
            'mime_type' => 'image',
        ]
    ));
});

function pc_massively_posts_url(): string
{
    $posts_page_id = (int) get_option('page_for_posts');
    if ($posts_page_id > 0) {
        $url = get_permalink($posts_page_id);
        if (is_string($url) && $url !== '') {
            return $url;
        }
    }

    return home_url('/');
}

function pc_massively_render_template_part(string $slug, string $name = '', array $args = []): string
{
    ob_start();
    get_template_part($slug, $name, $args);
    return (string) ob_get_clean();
}

add_shortcode('pc_post_list', function (array $atts = []): string {
    $atts = shortcode_atts([
        'title' => 'Posts',
        'posts_per_page' => '6',
        'category' => '',
        'exclude' => '',
        'orderby' => 'date',
        'order' => 'DESC',
    ], $atts, 'pc_post_list');

    $exclude = array_filter(array_map(
        'absint',
        preg_split('/\s*,\s*/', (string) $atts['exclude']) ?: []
    ));

    $query_args = [
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => max(1, (int) $atts['posts_per_page']),
        'orderby' => sanitize_key((string) $atts['orderby']),
        'order' => strtoupper((string) $atts['order']) === 'ASC' ? 'ASC' : 'DESC',
        'post__not_in' => $exclude,
        'no_found_rows' => true,
    ];

    if ((string) $atts['category'] !== '') {
        $query_args['category_name'] = sanitize_text_field((string) $atts['category']);
    }

    $query = new WP_Query($query_args);

    return pc_massively_render_template_part('template-parts/post-list/list', 'simple', [
        'title' => sanitize_text_field((string) $atts['title']),
        'query' => $query,
        'with_pagination' => false,
    ]);
});

add_shortcode('pc_featured_post', function (array $atts = []): string {
    $atts = shortcode_atts([
        'id' => '',
    ], $atts, 'pc_featured_post');

    $post = null;
    $id = absint((string) $atts['id']);

    if ($id > 0) {
        $candidate = get_post($id);
        if ($candidate instanceof WP_Post && $candidate->post_status === 'publish') {
            $post = $candidate;
        }
    }

    if (!$post) {
        $latest_posts = get_posts([
            'numberposts' => 1,
            'post_status' => 'publish',
        ]);
        $post = $latest_posts[0] ?? null;
    }

    return pc_massively_render_template_part('template-parts/post-list/list', 'featured', [
        'post' => $post,
    ]);
});
