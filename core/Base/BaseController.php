<?php
/**
 * Base Controller is used as a master class to store various reused functions and data for the Plugin.
 *
 * @package MRKWP_Freemius
 */

namespace MRKWP_Freemius\Base;

/**
 * Base controller class.
 */
class BaseController {

	/**
	 * The plugin path
	 *
	 * @var [type]
	 */
	public $plugin_path;

	/**
	 * Plugin URL
	 *
	 * @var [type]
	 */
	public $plugin_url;

	/**
	 * Plugin reference for the name of the plugin.
	 *
	 * @var [type]
	 */
	public $plugin;

	/**
	 * Construct for Base Controller.
	 */
	public function __construct() {
		$this->plugin_path = plugin_dir_path( dirname( __DIR__, 1 ) );
		$this->plugin_url  = plugin_dir_url( dirname( __DIR__, 1 ) );
		$this->plugin      = plugin_basename( dirname( __DIR__, 2 ) ) . '/mrkwp-freemius-blocks.php';
	}

	/**
	 * Register scripts to be later enqueued for carousel and swipper bundle
	 */
	public function register_scripts() {
		wp_enqueue_script( 'mrkwp-freemius-checkout', 'https://checkout.freemius.com/checkout.min.js', array( 'jquery' ), MRKWP_FREEMIUS_BLOCKS_VERSION );
		wp_enqueue_script(
			'mrkwp-freemius-btn-listener',
			$this->plugin_url . 'assets/build/js/freemius.checkout.js',
			array( 'mrkwp-freemius-checkout' ),
			MRKWP_FREEMIUS_BLOCKS_VERSION
		);
	}
}
