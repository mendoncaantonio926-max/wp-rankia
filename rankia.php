<?php
/**
 * Plugin Name: RankIA — SEO AEO GEO Optimizer
 * Plugin URI:  https://rankia.com.br
 * Description: Otimize seus posts para SEO, AEO e GEO diretamente no editor WordPress.
 * Version:     1.0.0
 * Author:      RankIA
 * Author URI:  https://rankia.com.br
 * License:     GPL-2.0+
 * Text Domain: rankia
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'RANKIA_VERSION', '1.0.0' );
define( 'RANKIA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'RANKIA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'RANKIA_API_BASE', 'https://rankia.com.br/api/v1' );

require_once RANKIA_PLUGIN_DIR . 'includes/class-settings.php';
require_once RANKIA_PLUGIN_DIR . 'includes/class-api.php';

function rankia_init() {
    $settings = new Rankia_Settings();
    $settings->init();

    $api = new Rankia_API();
    $api->init();
}
add_action( 'init', 'rankia_init' );

function rankia_enqueue_sidebar() {
    $asset_file = RANKIA_PLUGIN_DIR . 'build/index.asset.php';
    $asset = file_exists( $asset_file )
        ? require $asset_file
        : [ 'dependencies' => [], 'version' => RANKIA_VERSION ];

    wp_enqueue_script(
        'rankia-sidebar',
        RANKIA_PLUGIN_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version']
    );

    wp_enqueue_style(
        'rankia-sidebar-style',
        RANKIA_PLUGIN_URL . 'build/index.css',
        [],
        $asset['version']
    );

    wp_localize_script( 'rankia-sidebar', 'rankiaData', [
        'nonce'    => wp_create_nonce( 'wp_rest' ),
        'restUrl'  => rest_url( 'rankia/v1/' ),
        'hasKey'   => ! empty( get_option( 'rankia_api_key' ) ),
    ] );
}
add_action( 'enqueue_block_editor_assets', 'rankia_enqueue_sidebar' );
