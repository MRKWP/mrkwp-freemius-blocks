<?php
/**
 * Register block for Freemius Logo Display.
 *
 * @package  MRKWP_Freemius
 */

namespace MRKWP_Freemius\Blocks\Freemius;

use MRKWP_Freemius\Base\BaseController;

/**
 * Handle all the block for Freemius logo required for the Product Page.
 */
class LogoBlock extends BaseController {

	/**
	 * Register actions.
	 */
	public function register() {
		add_action( 'init', array( $this, 'create_blocks' ) );
	}

	/**
	 * Register block function called by init hook.
	 *
	 * @param [type] $atts block attributes.
	 * @return void
	 */
	public function create_blocks( $atts ) {
		register_block_type_from_metadata( $this->plugin_path . 'build/freemius-logo/' );
	}
}
