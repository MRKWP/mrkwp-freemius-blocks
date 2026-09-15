<?php
/**
 * Styling Settings Admin Page.
 *
 * Provides a dedicated Visual Design Studio for Freemius Blocks in WP Admin.
 *
 * @package MRKWP_Freemius\Admin
 */

namespace MRKWP_Freemius\Admin;

use MRKWP_Freemius\Base\BaseController;
use MRKWP_Freemius\Traits\DynamicStylesTrait;

/**
 * Class StylingSettings
 */
class StylingSettings extends BaseController {
	use DynamicStylesTrait;

	/**
	 * Register hooks and actions.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'wp_head', array( $this, 'print_dynamic_styles' ), 100 );
		add_action( 'admin_head', array( $this, 'print_dynamic_styles' ), 100 );
	}

	/**
	 * Add menu pages in WordPress Admin.
	 *
	 * @return void
	 */
	public function add_admin_pages() {
		add_menu_page(
			__( 'Freemius Blocks', 'mrkwp-freemius' ),
			__( 'Freemius Blocks', 'mrkwp-freemius' ),
			'manage_options',
			'mrkwp-freemius',
			array( $this, 'render_admin_page' ),
			'dashicons-cart',
			58
		);

		add_submenu_page(
			'mrkwp-freemius',
			__( 'Styling & Design', 'mrkwp-freemius' ),
			__( 'Styling & Design', 'mrkwp-freemius' ),
			'manage_options',
			'mrkwp-freemius',
			array( $this, 'render_admin_page' )
		);
	}

	/**
	 * Register settings in WordPress settings API.
	 *
	 * @return void
	 */
	public function register_settings() {
		register_setting(
			'mrkwp_freemius_settings_group',
			'mrkwp_freemius_global_styles',
			array(
				'type'              => 'object',
				'sanitize_callback' => array( $this, 'sanitize_styles' ),
				'default'           => self::get_default_styles(),
			)
		);
	}

	/**
	 * Register REST API routes for visual studio async saving.
	 *
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route(
			'mrkwp-freemius/v1',
			'/styles',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'rest_get_styles' ),
					'permission_callback' => array( $this, 'rest_permissions_check' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'rest_update_styles' ),
					'permission_callback' => array( $this, 'rest_permissions_check' ),
				),
			)
		);
	}

	/**
	 * Permissions check for REST endpoints.
	 *
	 * @return bool
	 */
	public function rest_permissions_check() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * REST handler to get styles.
	 *
	 * @return \WP_REST_Response
	 */
	public function rest_get_styles() {
		return rest_ensure_response(
			array(
				'success' => true,
				'styles'  => self::get_active_styles(),
			)
		);
	}

	/**
	 * REST handler to update styles.
	 *
	 * @param \WP_REST_Request $request Incoming request.
	 * @return \WP_REST_Response
	 */
	public function rest_update_styles( $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) || ! is_array( $params ) ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Invalid style payload.', 'mrkwp-freemius' ),
				),
				400
			);
		}

		$sanitized = $this->sanitize_styles( $params );
		update_option( 'mrkwp_freemius_global_styles', $sanitized );

		return rest_ensure_response(
			array(
				'success' => true,
				'styles'  => $sanitized,
				'message' => __( 'Styles saved successfully.', 'mrkwp-freemius' ),
			)
		);
	}

	/**
	 * Sanitize styles array.
	 *
	 * @param array $input Raw style input.
	 * @return array
	 */
	public function sanitize_styles( $input ) {
		if ( ! is_array( $input ) ) {
			return self::get_default_styles();
		}

		$sanitized = array();
		$defaults  = self::get_default_styles();

		foreach ( $defaults as $key => $default_val ) {
			if ( isset( $input[ $key ] ) ) {
				$sanitized[ $key ] = sanitize_text_field( (string) $input[ $key ] );
			} else {
				$sanitized[ $key ] = $default_val;
			}
		}

		return $sanitized;
	}

	/**
	 * Render the admin page.
	 *
	 * @return void
	 */
	public function render_admin_page() {
		$asset_file_path = $this->plugin_path . 'build/admin-styling/index.asset.php';
		$asset_file      = file_exists( $asset_file_path )
			? include $asset_file_path
			: array(
				'dependencies' => array( 'wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch' ),
				'version'      => MRKWP_FREEMIUS_BLOCKS_VERSION,
			);

		wp_enqueue_script(
			'mrkwp-freemius-admin-styling',
			$this->plugin_url . 'build/admin-styling/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		// Enqueue WP Components styling for admin.
		wp_enqueue_style( 'wp-components' );

		$admin_css = file_exists( $this->plugin_path . 'build/admin-styling/style-index.css' )
			? 'build/admin-styling/style-index.css'
			: 'build/admin-styling/index.css';

		if ( file_exists( $this->plugin_path . $admin_css ) ) {
			wp_enqueue_style(
				'mrkwp-freemius-admin-styling',
				$this->plugin_url . $admin_css,
				array( 'wp-components' ),
				$asset_file['version']
			);
		}

		// Enqueue all pricing table block styles for the live preview.
		$preview_blocks = array(
			'freemius-pricing-table',
			'freemius-pricing-table-header',
			'freemius-pricing-plan',
			'freemius-pricing-plan-header',
			'freemius-pricing-plan-price',
			'freemius-pricing-plan-features',
			'freemius-pricing-plan-feature-item',
			'freemius-pricing-plan-button',
		);

		foreach ( $preview_blocks as $block_slug ) {
			$css_rel = "build/{$block_slug}/style-index.css";
			if ( file_exists( $this->plugin_path . $css_rel ) ) {
				wp_enqueue_style(
					"mrkwp-{$block_slug}-style",
					$this->plugin_url . $css_rel,
					array(),
					MRKWP_FREEMIUS_BLOCKS_VERSION
				);
			}
		}

		$palettes = self::get_theme_palettes();

		wp_localize_script(
			'mrkwp-freemius-admin-styling',
			'mrkwpFreemiusSettings',
			array(
				'restUrl'       => rest_url( 'mrkwp-freemius/v1/styles' ),
				'nonce'         => wp_create_nonce( 'wp_rest' ),
				'currentStyles' => self::get_active_styles(),
				'defaultStyles' => self::get_default_styles(),
				'themeColors'   => $palettes['theme'],
				'defaultColors' => $palettes['default'],
			)
		);

		echo '<div class="wrap mrkwp-freemius-admin-wrap">';
		echo '<div id="mrkwp-freemius-styling-app"></div>';
		echo '</div>';
	}

	/**
	 * Retrieve theme color palette and default core colors.
	 *
	 * @return array
	 */
	public static function get_theme_palettes() {
		$theme_colors   = array();
		$default_colors = array();

		// 1. Try theme.json / Global Settings (WP 5.8+).
		if ( function_exists( 'wp_get_global_settings' ) ) {
			$raw_theme   = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
			$raw_default = wp_get_global_settings( array( 'color', 'palette', 'default' ) );

			if ( ! empty( $raw_theme ) && is_array( $raw_theme ) ) {
				$theme_colors = $raw_theme;
			}
			if ( ! empty( $raw_default ) && is_array( $raw_default ) ) {
				$default_colors = $raw_default;
			}
		}

		// 2. Fallback to classic get_theme_support( 'editor-color-palette' ).
		if ( empty( $theme_colors ) ) {
			$classic_palette = get_theme_support( 'editor-color-palette' );
			if ( ! empty( $classic_palette ) && is_array( $classic_palette[0] ) ) {
				$theme_colors = $classic_palette[0];
			}
		}

		// 3. Fallback standard core default colors if empty.
		if ( empty( $default_colors ) ) {
			$default_colors = array(
				array(
					'name'  => __( 'Black', 'mrkwp-freemius' ),
					'slug'  => 'black',
					'color' => '#000000',
				),
				array(
					'name'  => __( 'Cyan bluish gray', 'mrkwp-freemius' ),
					'slug'  => 'cyan-bluish-gray',
					'color' => '#abb8c3',
				),
				array(
					'name'  => __( 'White', 'mrkwp-freemius' ),
					'slug'  => 'white',
					'color' => '#ffffff',
				),
				array(
					'name'  => __( 'Pale pink', 'mrkwp-freemius' ),
					'slug'  => 'pale-pink',
					'color' => '#f78da7',
				),
				array(
					'name'  => __( 'Vivid red', 'mrkwp-freemius' ),
					'slug'  => 'vivid-red',
					'color' => '#cf2e2e',
				),
				array(
					'name'  => __( 'Luminous vivid orange', 'mrkwp-freemius' ),
					'slug'  => 'luminous-vivid-orange',
					'color' => '#ff6900',
				),
				array(
					'name'  => __( 'Luminous vivid amber', 'mrkwp-freemius' ),
					'slug'  => 'luminous-vivid-amber',
					'color' => '#fcb900',
				),
				array(
					'name'  => __( 'Light green cyan', 'mrkwp-freemius' ),
					'slug'  => 'light-green-cyan',
					'color' => '#7bdcb5',
				),
				array(
					'name'  => __( 'Vivid green cyan', 'mrkwp-freemius' ),
					'slug'  => 'vivid-green-cyan',
					'color' => '#00d084',
				),
				array(
					'name'  => __( 'Pale cyan blue', 'mrkwp-freemius' ),
					'slug'  => 'pale-cyan-blue',
					'color' => '#8ed1fc',
				),
				array(
					'name'  => __( 'Vivid cyan blue', 'mrkwp-freemius' ),
					'slug'  => 'vivid-cyan-blue',
					'color' => '#0693e3',
				),
				array(
					'name'  => __( 'Vivid purple', 'mrkwp-freemius' ),
					'slug'  => 'vivid-purple',
					'color' => '#9b51e0',
				),
			);
		}

		return array(
			'theme'   => $theme_colors,
			'default' => $default_colors,
		);
	}
}
