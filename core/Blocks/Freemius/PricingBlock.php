<?php
/**
 * Load the Freemius Pricing block with Javascript for checkout.
 *
 * @package  MRKWP_Freemius
 */

namespace MRKWP_Freemius\Blocks\Freemius;

use MRKWP_Freemius\Base\BaseController;

/**
 * Handle all the blocks required for the Product Page.
 */
class PricingBlock extends BaseController {

	/**
	 * Register actions.
	 */
	public function register() {
		add_action( 'init', array( $this, 'create_blocks' ) );
		add_action( 'the_content', array( $this, 'check_freemius_assets' ) );
	}

	/**
	 * Load Freemius block for Priicing.
	 *
	 * @param [type] $atts block attributes.
	 * @return void
	 */
	public function create_blocks( $atts ) {
		register_block_type_from_metadata( $this->plugin_path . 'build/freemius-pricing/' );
	}

	/**
	 * Used to check if freemius assets should be loaded.
	 *
	 * @param [type] $content mixed content. Load the Freemius JS.
	 * @return mixed $content
	 */
	public function check_freemius_assets( $content = '' ) {

		if ( has_block( 'create-block/faq-pricing-table' ) || has_block( 'mrkwp/freemius-pricing-block' ) ) {
			$this->load_freemius_js();
		}

		return $content;
	}

	/**
	 * Used to load freemius if a freemius block is loaded inside the content of the page.
	 *
	 * @return void
	 */
	public function load_freemius_js() {
		wp_enqueue_script( 'mrkwp-freemius-checkout', 'https://checkout.freemius.com/checkout.min.js', array( 'jquery' ) );
		wp_enqueue_script(
			'mrkwp-product-btn-checkout-listener',
			$this->plugin_url . '/template-parts/freemius-gravity/js/freemius.checkout.js',
			array( 'mrkwp-freemius-checkout' ),
		);
	}
}
