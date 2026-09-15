<?php
/**
 * Trait for managing Freemius checkout scripts and assets.
 *
 * @package MRKWP_Freemius\Traits
 */

namespace MRKWP_Freemius\Traits;

/**
 * FreemiusAssetsTrait handles registration and enqueueing of Freemius SDK assets.
 */
trait FreemiusAssetsTrait {

	/**
	 * Register Freemius checkout SDK and client handler scripts.
	 *
	 * @return void
	 */
	public function register_freemius_scripts() {
		// Register Freemius official checkout JS SDK.
		wp_register_script(
			'mrkwp-freemius-checkout',
			'https://checkout.freemius.com/checkout.min.js',
			array(),
			MRKWP_FREEMIUS_BLOCKS_VERSION,
			true
		);

		// Register the button listener and billing cycle toggle script.
		wp_register_script(
			'mrkwp-freemius-btn-listener',
			$this->plugin_url . 'assets/build/js/freemius.checkout.js',
			array( 'mrkwp-freemius-checkout' ),
			MRKWP_FREEMIUS_BLOCKS_VERSION,
			true
		);
	}
}
