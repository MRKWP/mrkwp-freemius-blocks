<?php
/**
 * Plugin Name:     M R K WP Freemius Blocks
 * Plugin URI:      https://www.mrkwp.com
 * Description:     A set of blocks for Freemius users to easily add plans etc.
 * Author:          M R K WP
 * Author URI:      https://www.mrkwp.com
 * Text Domain:     mrkwp-freemius
 * Domain Path:     /languages
 * Version:         2.1.0
 *
 * @package mrk-freemius-blocks
 */

// If this file is called firectly, abort!!!
defined( 'ABSPATH' ) or die( 'No Access!' );

if ( ! defined( 'MRKWP_FREEMIUS_BLOCKS_VERSION' ) ) {
	define( 'MRKWP_FREEMIUS_BLOCKS_VERSION', '2.1.0' );
}

// Require once the Composer Autoload, or use PSR-4 fallback.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
} else {
	spl_autoload_register(
		function ( $class ) {
			$prefix   = 'MRKWP_Freemius\\';
			$base_dir = __DIR__ . '/core/';
			$len      = strlen( $prefix );
			if ( strncmp( $prefix, $class, $len ) !== 0 ) {
				return;
			}
			$relative_class = substr( $class, $len );
			$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';
			if ( file_exists( $file ) ) {
				require_once $file;
			}
		}
	);
}

/**
 * The code that runs during plugin activation.
 *
 * @return void
 */
function activate_mrkwp_freemius_plugin() {
	MRKWP_Freemius\Base\Activate::activate();
}
register_activation_hook( __FILE__, 'activate_mrkwp_freemius_plugin' );

/**
 * The code that runs during plugin deactivation.
 *
 * @return void
 */
function deactivate_mrkwp_freemius_plugin() {
	MRKWP_Freemius\Base\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_mrkwp_freemius_plugin' );

/**
 * Initialize all the core classes of the plugin.
 */
if ( class_exists( 'MRKWP_Freemius\\Init' ) ) {
	MRKWP_Freemius\Init::register_services();
}
