import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
	Button,
	Notice,
	SelectControl,
	RangeControl,
	Spinner,
} from '@wordpress/components';
import ColorField from './ColorField';
import LivePreview from './LivePreview';
import { DEFAULT_STYLES, PRESETS, SHADOW_OPTIONS } from './presets';
import './style.scss';

export default function App() {
	const initialStyles = {
		...DEFAULT_STYLES,
		...( window.mrkwpFreemiusSettings?.currentStyles || {} ),
	};

	const [ styles, setStyles ] = useState( initialStyles );
	const [ activeTab, setActiveTab ] = useState( 'card' );
	const [ deviceView, setDeviceView ] = useState( 'desktop' );
	const [ canvasBg, setCanvasBg ] = useState( 'light' );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const updateStyle = ( key, value ) => {
		setStyles( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	const handlePresetChange = ( presetId ) => {
		const found = PRESETS.find( ( p ) => p.id === presetId );
		if ( found ) {
			setStyles( { ...found.styles } );
			setNotice( {
				type: 'info',
				message: `${ __( 'Applied preset:', 'mrkwp-freemius' ) } ${
					found.name
				}`,
			} );
		}
	};

	const handleReset = () => {
		if (
			window.confirm(
				__(
					'Are you sure you want to reset all styling to factory defaults?',
					'mrkwp-freemius'
				)
			)
		) {
			setStyles( { ...DEFAULT_STYLES } );
			setNotice( {
				type: 'info',
				message: __(
					'Reset to default styles. Click "Save Changes" to apply.',
					'mrkwp-freemius'
				),
			} );
		}
	};

	const handleSave = async () => {
		setIsSaving( true );
		setNotice( null );

		try {
			const res = await apiFetch( {
				url:
					window.mrkwpFreemiusSettings?.restUrl ||
					'/wp-json/mrkwp-freemius/v1/styles',
				method: 'POST',
				headers: {
					'X-WP-Nonce': window.mrkwpFreemiusSettings?.nonce || '',
					'Content-Type': 'application/json',
				},
				data: styles,
			} );

			if ( res && res.success ) {
				setNotice( {
					type: 'success',
					message: __(
						'Design styles successfully saved! Your pricing tables will now reflect these styles across all pages.',
						'mrkwp-freemius'
					),
				} );
			} else {
				throw new Error( res?.message || 'Save failed' );
			}
		} catch ( err ) {
			setNotice( {
				type: 'error',
				message:
					err.message ||
					__(
						'Error saving styles. Please try again.',
						'mrkwp-freemius'
					),
			} );
		} finally {
			setIsSaving( false );
		}
	};

	const TABS = [
		{
			id: 'card',
			label: __( 'Card & Colors', 'mrkwp-freemius' ),
			icon: 'art',
		},
		{
			id: 'highlight',
			label: __( 'Featured Plan', 'mrkwp-freemius' ),
			icon: 'star-filled',
		},
		{
			id: 'toggle',
			label: __( 'Billing Toggle', 'mrkwp-freemius' ),
			icon: 'controls-repeat',
		},
		{
			id: 'buttons',
			label: __( 'Buttons & Shapes', 'mrkwp-freemius' ),
			icon: 'button',
		},
		{
			id: 'shadows',
			label: __( 'Shadows', 'mrkwp-freemius' ),
			icon: 'admin-appearance',
		},
	];

	return (
		<div className="mrkwp-studio">
			{ /* Header Bar */ }
			<header className="mrkwp-studio__header">
				<div className="mrkwp-studio__brand">
					<span className="dashicons dashicons-money-alt mrkwp-studio__brand-icon"></span>
					<div>
						<h1 className="mrkwp-studio__title">
							{ __(
								'Freemius Blocks Design Studio',
								'mrkwp-freemius'
							) }
						</h1>
						<p className="mrkwp-studio__subtitle">
							{ __(
								'Customize your pricing tables visually with universal theme compatibility.',
								'mrkwp-freemius'
							) }
						</p>
					</div>
				</div>

				<div className="mrkwp-studio__actions">
					{ /* Presets Selector */ }
					<div className="mrkwp-studio__preset-wrap">
						<SelectControl
							label={ __( 'Theme Preset', 'mrkwp-freemius' ) }
							hideLabelFromVision
							options={ [
								{
									label: __(
										'✨ Choose a Theme Preset...',
										'mrkwp-freemius'
									),
									value: '',
								},
								...PRESETS.map( ( p ) => ( {
									label: p.name,
									value: p.id,
								} ) ),
							] }
							onChange={ handlePresetChange }
						/>
					</div>

					<Button
						variant="secondary"
						onClick={ handleReset }
						disabled={ isSaving }
					>
						{ __( 'Reset Defaults', 'mrkwp-freemius' ) }
					</Button>

					<Button
						variant="primary"
						onClick={ handleSave }
						disabled={ isSaving }
						className="mrkwp-studio__save-btn"
					>
						{ isSaving ? (
							<>
								<Spinner />
								{ __( 'Saving...', 'mrkwp-freemius' ) }
							</>
						) : (
							__( 'Save Changes', 'mrkwp-freemius' )
						) }
					</Button>
				</div>
			</header>

			{ /* Notice Banner */ }
			{ notice && (
				<div className="mrkwp-studio__notice-area">
					<Notice
						status={ notice.type }
						isDismissible
						onDismiss={ () => setNotice( null ) }
					>
						{ notice.message }
					</Notice>
				</div>
			) }

			{ /* Studio Body Split Screen */ }
			<div className="mrkwp-studio__body">
				{ /* Left Panel: Controls */ }
				<aside className="mrkwp-studio__sidebar">
					<nav className="mrkwp-studio__tabs" role="tablist">
						{ TABS.map( ( tab ) => (
							<button
								key={ tab.id }
								type="button"
								role="tab"
								aria-selected={ activeTab === tab.id }
								className={ `mrkwp-studio__tab-btn ${
									activeTab === tab.id ? 'is-active' : ''
								}` }
								onClick={ () => setActiveTab( tab.id ) }
							>
								{ tab.label }
							</button>
						) ) }
					</nav>

					<div className="mrkwp-studio__tab-content">
						{ activeTab === 'card' && (
							<div className="mrkwp-studio__section">
								<h3>
									{ __(
										'Card & Background Colors',
										'mrkwp-freemius'
									) }
								</h3>
								<ColorField
									label={ __(
										'Card Background Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Background color of standard pricing cards.',
										'mrkwp-freemius'
									) }
									value={ styles.bg }
									onChange={ ( val ) =>
										updateStyle( 'bg', val )
									}
								/>
								<ColorField
									label={ __(
										'Primary Text Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Color for plan titles and main pricing amounts.',
										'mrkwp-freemius'
									) }
									value={ styles.text }
									onChange={ ( val ) =>
										updateStyle( 'text', val )
									}
								/>
								<ColorField
									label={ __(
										'Muted / Secondary Text',
										'mrkwp-freemius'
									) }
									help={ __(
										'Color for subtitles, periods, and unhighlighted features.',
										'mrkwp-freemius'
									) }
									value={ styles.textMuted }
									onChange={ ( val ) =>
										updateStyle( 'textMuted', val )
									}
								/>
								<ColorField
									label={ __(
										'Card Border Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Border color outlining standard plan cards.',
										'mrkwp-freemius'
									) }
									value={ styles.border }
									onChange={ ( val ) =>
										updateStyle( 'border', val )
									}
								/>
								<RangeControl
									label={ __(
										'Card Corner Rounding (Radius)',
										'mrkwp-freemius'
									) }
									value={
										parseInt( styles.cardRadius, 10 ) || 24
									}
									onChange={ ( val ) =>
										updateStyle(
											'cardRadius',
											`${ val }px`
										)
									}
									min={ 0 }
									max={ 40 }
								/>
							</div>
						) }

						{ activeTab === 'highlight' && (
							<div className="mrkwp-studio__section">
								<h3>
									{ __(
										'Featured Plan & Accent Styling',
										'mrkwp-freemius'
									) }
								</h3>
								<ColorField
									label={ __(
										'Highlight Accent Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Color for the "MOST POPULAR PLAN" badge and card border.',
										'mrkwp-freemius'
									) }
									value={ styles.accent }
									onChange={ ( val ) =>
										updateStyle( 'accent', val )
									}
								/>
								<ColorField
									label={ __(
										'Badge Text Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Text color inside the featured badge banner.',
										'mrkwp-freemius'
									) }
									value={ styles.accentText }
									onChange={ ( val ) =>
										updateStyle( 'accentText', val )
									}
								/>
								<ColorField
									label={ __(
										'Feature Highlight Pill Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Accent color for items with "Highlight this feature" enabled.',
										'mrkwp-freemius'
									) }
									value={ styles.featureHighlight }
									onChange={ ( val ) =>
										updateStyle( 'featureHighlight', val )
									}
								/>
							</div>
						) }

						{ activeTab === 'toggle' && (
							<div className="mrkwp-studio__section">
								<h3>
									{ __(
										'Annual / Lifetime Switcher',
										'mrkwp-freemius'
									) }
								</h3>
								<ColorField
									label={ __(
										'Toggle Container Background',
										'mrkwp-freemius'
									) }
									help={ __(
										'Background color of the pill container wrapper.',
										'mrkwp-freemius'
									) }
									value={ styles.toggleBg }
									onChange={ ( val ) =>
										updateStyle( 'toggleBg', val )
									}
								/>
								<ColorField
									label={ __(
										'Active Pill Background',
										'mrkwp-freemius'
									) }
									help={ __(
										'Background color of the currently selected billing cycle.',
										'mrkwp-freemius'
									) }
									value={ styles.toggleActiveBg }
									onChange={ ( val ) =>
										updateStyle( 'toggleActiveBg', val )
									}
								/>
								<ColorField
									label={ __(
										'Active Pill Text Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Text color of the currently active billing cycle label.',
										'mrkwp-freemius'
									) }
									value={ styles.toggleActiveText }
									onChange={ ( val ) =>
										updateStyle( 'toggleActiveText', val )
									}
								/>
							</div>
						) }

						{ activeTab === 'buttons' && (
							<div className="mrkwp-studio__section">
								<h3>
									{ __(
										'Checkout Button Styling',
										'mrkwp-freemius'
									) }
								</h3>
								<ColorField
									label={ __(
										'Button Background Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Default background color of Freemius checkout buttons.',
										'mrkwp-freemius'
									) }
									value={ styles.btnBg }
									onChange={ ( val ) =>
										updateStyle( 'btnBg', val )
									}
								/>
								<ColorField
									label={ __(
										'Button Text Color',
										'mrkwp-freemius'
									) }
									help={ __(
										'Text color of the button label.',
										'mrkwp-freemius'
									) }
									value={ styles.btnColor }
									onChange={ ( val ) =>
										updateStyle( 'btnColor', val )
									}
								/>
								<ColorField
									label={ __(
										'Button Hover Background',
										'mrkwp-freemius'
									) }
									help={ __(
										'Background color when a visitor hovers or focuses on the button.',
										'mrkwp-freemius'
									) }
									value={ styles.btnHoverBg }
									onChange={ ( val ) =>
										updateStyle( 'btnHoverBg', val )
									}
								/>
								<RangeControl
									label={ __(
										'Button Corner Rounding (Radius)',
										'mrkwp-freemius'
									) }
									value={
										styles.btnRadius === '9999px'
											? 32
											: parseInt(
													styles.btnRadius,
													10
											  ) || 8
									}
									onChange={ ( val ) =>
										updateStyle(
											'btnRadius',
											val >= 30 ? '9999px' : `${ val }px`
										)
									}
									min={ 0 }
									max={ 32 }
									help={ __(
										'Slide to maximum (32px) for pill buttons, or smaller values for rounded rectangles.',
										'mrkwp-freemius'
									) }
								/>
							</div>
						) }

						{ activeTab === 'shadows' && (
							<div className="mrkwp-studio__section">
								<h3>
									{ __(
										'Card Shadows & Elevations',
										'mrkwp-freemius'
									) }
								</h3>
								<SelectControl
									label={ __(
										'Standard Card Shadow',
										'mrkwp-freemius'
									) }
									value={ styles.cardShadow }
									options={ SHADOW_OPTIONS }
									onChange={ ( val ) =>
										updateStyle( 'cardShadow', val )
									}
								/>
								<SelectControl
									label={ __(
										'Card Hover Shadow',
										'mrkwp-freemius'
									) }
									value={ styles.cardShadowHover }
									options={ SHADOW_OPTIONS }
									onChange={ ( val ) =>
										updateStyle( 'cardShadowHover', val )
									}
								/>
								<div className="mrkwp-custom-shadow">
									<label className="mrkwp-color-field__label">
										{ __(
											'Featured Plan Shadow Glow',
											'mrkwp-freemius'
										) }
									</label>
									<input
										type="text"
										className="mrkwp-color-field__input"
										value={ styles.highlightShadow || '' }
										onChange={ ( e ) =>
											updateStyle(
												'highlightShadow',
												e.target.value
											)
										}
										placeholder="0 20px 35px -5px rgba(255, 183, 3, 0.15)"
									/>
									<p className="mrkwp-color-field__help">
										{ __(
											'CSS box-shadow string applied to the featured plan card.',
											'mrkwp-freemius'
										) }
									</p>
								</div>
							</div>
						) }
					</div>
				</aside>

				{ /* Right Panel: Interactive Live Preview */ }
				<main className="mrkwp-studio__preview-panel">
					{ /* Preview Viewport Toolbar */ }
					<div className="mrkwp-studio__preview-toolbar">
						<div className="mrkwp-studio__device-toggles">
							<span className="mrkwp-studio__toolbar-label">
								{ __( 'Device Preview:', 'mrkwp-freemius' ) }
							</span>
							<button
								type="button"
								className={ `mrkwp-device-btn ${
									deviceView === 'desktop' ? 'is-active' : ''
								}` }
								onClick={ () => setDeviceView( 'desktop' ) }
								title={ __(
									'Desktop View (100%)',
									'mrkwp-freemius'
								) }
							>
								<span className="dashicons dashicons-desktop"></span>
								{ __( 'Desktop', 'mrkwp-freemius' ) }
							</button>
							<button
								type="button"
								className={ `mrkwp-device-btn ${
									deviceView === 'tablet' ? 'is-active' : ''
								}` }
								onClick={ () => setDeviceView( 'tablet' ) }
								title={ __(
									'Tablet View (768px)',
									'mrkwp-freemius'
								) }
							>
								<span className="dashicons dashicons-tablet"></span>
								{ __( 'Tablet', 'mrkwp-freemius' ) }
							</button>
							<button
								type="button"
								className={ `mrkwp-device-btn ${
									deviceView === 'mobile' ? 'is-active' : ''
								}` }
								onClick={ () => setDeviceView( 'mobile' ) }
								title={ __(
									'Mobile View (390px)',
									'mrkwp-freemius'
								) }
							>
								<span className="dashicons dashicons-smartphone"></span>
								{ __( 'Mobile', 'mrkwp-freemius' ) }
							</button>
						</div>

						<div className="mrkwp-studio__canvas-bg-toggle">
							<span className="mrkwp-studio__toolbar-label">
								{ __( 'Canvas Background:', 'mrkwp-freemius' ) }
							</span>
							<button
								type="button"
								className={ `mrkwp-canvas-bg-btn ${
									canvasBg === 'light' ? 'is-active' : ''
								}` }
								onClick={ () => setCanvasBg( 'light' ) }
								title={ __( 'Light Canvas', 'mrkwp-freemius' ) }
							>
								☀️
							</button>
							<button
								type="button"
								className={ `mrkwp-canvas-bg-btn ${
									canvasBg === 'dark' ? 'is-active' : ''
								}` }
								onClick={ () => setCanvasBg( 'dark' ) }
								title={ __( 'Dark Canvas', 'mrkwp-freemius' ) }
							>
								🌙
							</button>
							<button
								type="button"
								className={ `mrkwp-canvas-bg-btn ${
									canvasBg === 'checker' ? 'is-active' : ''
								}` }
								onClick={ () => setCanvasBg( 'checker' ) }
								title={ __(
									'Checkerboard Canvas',
									'mrkwp-freemius'
								) }
							>
								🏁
							</button>
						</div>
					</div>

					{ /* Live Canvas */ }
					<div
						className={ `mrkwp-studio__canvas mrkwp-studio__canvas--${ canvasBg }` }
					>
						<LivePreview
							styles={ styles }
							deviceView={ deviceView }
						/>
					</div>
				</main>
			</div>
		</div>
	);
}
