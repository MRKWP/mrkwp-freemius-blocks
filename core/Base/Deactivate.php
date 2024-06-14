<?php
/**
 * Deactivate Class.
 *
 * @package  MRKWP_Freemius
 */

namespace MRKWP_Freemius\Base;

/**
 * Deactivate Class
 */
class Deactivate {

	/**
	 * Static function for Deactivate.
	 *
	 * @return void
	 */
	public static function deactivate() {
		flush_rewrite_rules();
	}
}
