<?php
/**
 * Dynamic Styles Trait
 *
 * Emits dynamic CSS variables for Freemius Blocks across frontend and editor.
 *
 * @package MRKWP_Freemius\Traits
 */

namespace MRKWP_Freemius\Traits;

/**
 * Trait DynamicStylesTrait
 */
trait DynamicStylesTrait {

	/**
	 * Default styles configuration.
	 *
	 * @return array
	 */
	public static function get_default_styles() {
		return array(
			'bg'               => '#ffffff',
			'text'             => '#111827',
			'textMuted'        => '#6b7280',
			'accent'           => '#ffb703',
			'accentText'       => '#111827',
			'featureHighlight' => '#2563eb',
			'border'           => '#e5e7eb',
			'toggleBg'         => '#f1f5f9',
			'toggleActiveBg'   => '#ffffff',
			'toggleActiveText' => '#111827',
			'btnBg'            => '#111827',
			'btnColor'         => '#ffffff',
			'btnHoverBg'       => '#1f2937',
			'cardShadow'       => '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
			'cardShadowHover'  => '0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
			'highlightShadow'  => '0 20px 35px -5px rgba(255, 183, 3, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
			'cardRadius'       => '24px',
			'btnRadius'        => '9999px',
		);
	}

	/**
	 * Get merged active styles.
	 *
	 * @return array
	 */
	public static function get_active_styles() {
		$saved    = get_option( 'mrkwp_freemius_global_styles', array() );
		$defaults = self::get_default_styles();

		if ( ! is_array( $saved ) ) {
			return $defaults;
		}

		return wp_parse_args( $saved, $defaults );
	}

	/**
	 * Generate dynamic CSS custom properties block.
	 *
	 * @return string
	 */
	public function get_dynamic_css() {
		$styles = self::get_active_styles();

		$mapping = array(
			'bg'               => '--mrkwp-bg',
			'text'             => '--mrkwp-text',
			'textMuted'        => '--mrkwp-text-muted',
			'accent'           => '--mrkwp-accent',
			'accentText'       => '--mrkwp-accent-text',
			'featureHighlight' => '--mrkwp-feature-highlight',
			'border'           => '--mrkwp-border',
			'toggleBg'         => '--mrkwp-toggle-bg',
			'toggleActiveBg'   => '--mrkwp-toggle-active-bg',
			'toggleActiveText' => '--mrkwp-toggle-active-text',
			'btnBg'            => '--mrkwp-btn-bg',
			'btnColor'         => '--mrkwp-btn-color',
			'btnHoverBg'       => '--mrkwp-btn-hover-bg',
			'cardShadow'       => '--mrkwp-card-shadow',
			'cardShadowHover'  => '--mrkwp-card-shadow-hover',
			'highlightShadow'  => '--mrkwp-highlight-shadow',
			'cardRadius'       => '--mrkwp-card-radius',
			'btnRadius'        => '--mrkwp-btn-radius',
		);

		$css_lines = array();
		foreach ( $mapping as $key => $var_name ) {
			if ( ! empty( $styles[ $key ] ) ) {
				$val         = sanitize_text_field( $styles[ $key ] );
				$css_lines[] = "  {$var_name}: {$val};";
			}
		}

		if ( empty( $css_lines ) ) {
			return '';
		}

		return ":root {\n" . implode( "\n", $css_lines ) . "\n}";
	}

	/**
	 * Print dynamic styles tag in head.
	 *
	 * @return void
	 */
	public function print_dynamic_styles() {
		$css = $this->get_dynamic_css();
		if ( ! empty( $css ) ) {
			echo "\n<!-- Freemius Blocks Global Styles -->\n";
			echo "<style id=\"mrkwp-freemius-dynamic-vars\">\n" . $css . "\n</style>\n";
		}
	}
}
