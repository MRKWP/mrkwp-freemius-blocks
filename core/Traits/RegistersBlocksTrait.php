<?php
/**
 * Trait for registering Gutenberg blocks.
 *
 * @package MRKWP_Freemius\Traits
 */

namespace MRKWP_Freemius\Traits;

/**
 * RegistersBlocksTrait provides helper methods to register blocks from block.json metadata.
 */
trait RegistersBlocksTrait {

	/**
	 * Register a block using its build folder name.
	 *
	 * @param string $block_folder Folder name under build/.
	 * @return \WP_Block_Type|false The registered block type on success, or false on failure.
	 */
	public function register_block_metadata( string $block_folder ) {
		$path = trailingslashit( $this->plugin_path ) . 'build/' . $block_folder;

		if ( file_exists( $path . '/block.json' ) ) {
			return register_block_type_from_metadata( $path );
		}

		return false;
	}

	/**
	 * Register an array of blocks by their folder names under build/.
	 *
	 * @param array $block_folders Array of build subfolder names.
	 * @return void
	 */
	public function register_blocks_metadata( array $block_folders ) {
		foreach ( $block_folders as $block_folder ) {
			$this->register_block_metadata( $block_folder );
		}
	}
}
