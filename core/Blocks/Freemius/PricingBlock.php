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
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
	}

	/**
	 * Load Freemius block for Priicing.
	 *
	 * @return void
	 */
	public function create_blocks() {
		register_block_type( $this->plugin_path . 'build/freemius-pricing' );
	}
}
