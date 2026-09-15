<?php
/**
 * Freemius Pricing Table Block class.
 *
 * @package MRKWP_Freemius\Blocks\Freemius
 */

namespace MRKWP_Freemius\Blocks\Freemius;

use MRKWP_Freemius\Base\BaseController;
use MRKWP_Freemius\Traits\RegistersBlocksTrait;
use MRKWP_Freemius\Traits\FreemiusAssetsTrait;

/**
 * Class PricingTableBlock
 *
 * Handles the registration of the Freemius Pricing Table block and all its child blocks,
 * along with the necessary Freemius Checkout SDK assets.
 */
class PricingTableBlock extends BaseController {
	use RegistersBlocksTrait;
	use FreemiusAssetsTrait;

	/**
	 * Register actions and hooks.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'init', array( $this, 'create_blocks' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_freemius_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_freemius_scripts' ) );
	}

	/**
	 * Register the main Pricing Table block and all inner child blocks.
	 *
	 * @return void
	 */
	public function create_blocks() {
		$block_types = array(
			'freemius-pricing-table',
			'freemius-pricing-table-header',
			'freemius-pricing-plan',
			'freemius-pricing-plan-header',
			'freemius-pricing-plan-price',
			'freemius-pricing-plan-features',
			'freemius-pricing-plan-feature-item',
			'freemius-pricing-plan-button',
		);

		$this->register_blocks_metadata( $block_types );
	}
}
