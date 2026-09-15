import { useState } from '@wordpress/element';
import { ColorPicker, Popover, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function isSameColor( col1, col2 ) {
	if ( ! col1 || ! col2 ) {
		return false;
	}
	return col1.toLowerCase().trim() === col2.toLowerCase().trim();
}

export default function ColorField( { label, help, value, onChange } ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ showCustomPicker, setShowCustomPicker ] = useState( false );

	const themeColors = window.mrkwpFreemiusSettings?.themeColors || [];
	const defaultColors = window.mrkwpFreemiusSettings?.defaultColors || [];

	return (
		<div className="mrkwp-color-field">
			<div className="mrkwp-color-field__label-wrap">
				<label className="mrkwp-color-field__label">{ label }</label>
				{ help && <p className="mrkwp-color-field__help">{ help }</p> }
			</div>

			<div className="mrkwp-color-field__controls">
				<button
					type="button"
					className="mrkwp-color-field__swatch"
					style={ { backgroundColor: value || 'transparent' } }
					onClick={ () => setIsOpen( ! isOpen ) }
					aria-label={ `Choose color for ${ label }` }
					title={
						value || __( 'No color selected', 'mrkwp-freemius' )
					}
				/>
				<input
					type="text"
					className="mrkwp-color-field__input"
					value={ value || '' }
					onChange={ ( e ) => onChange( e.target.value ) }
					placeholder="#000000"
				/>

				{ isOpen && (
					<Popover
						onClose={ () => {
							setIsOpen( false );
							setShowCustomPicker( false );
						} }
						position="bottom left"
						className="mrkwp-color-popover"
					>
						<div className="mrkwp-palette-modal">
							{ /* Top Active Color Preview Bar */ }
							<div className="mrkwp-palette-modal__preview-bar">
								<div
									className="mrkwp-palette-modal__preview-swatch"
									style={ {
										backgroundColor: value || 'transparent',
									} }
								/>
								<div className="mrkwp-palette-modal__preview-info">
									<span className="mrkwp-palette-modal__preview-val">
										{ value ||
											__(
												'No color selected',
												'mrkwp-freemius'
											) }
									</span>
								</div>
								<div className="mrkwp-palette-modal__preview-actions">
									<Button
										isSmall
										variant={
											showCustomPicker
												? 'primary'
												: 'secondary'
										}
										onClick={ () =>
											setShowCustomPicker(
												! showCustomPicker
											)
										}
										className="mrkwp-palette-custom-toggle"
									>
										{ showCustomPicker
											? __( 'Palette', 'mrkwp-freemius' )
											: __(
													'Custom color',
													'mrkwp-freemius'
											  ) }
									</Button>
									{ value && (
										<Button
											isSmall
											variant="tertiary"
											onClick={ () => onChange( '' ) }
											className="mrkwp-palette-clear-btn"
										>
											{ __( 'Clear', 'mrkwp-freemius' ) }
										</Button>
									) }
								</div>
							</div>

							{ /* Custom Color Picker (when toggled on) */ }
							{ showCustomPicker ? (
								<div className="mrkwp-palette-modal__custom-picker">
									<ColorPicker
										color={ value || '#ffffff' }
										onChange={ ( newColor ) =>
											onChange( newColor )
										}
										enableAlpha
									/>
								</div>
							) : (
								<div className="mrkwp-palette-modal__palettes">
									{ /* Theme Palette Section */ }
									{ themeColors.length > 0 && (
										<div className="mrkwp-palette-group">
											<div className="mrkwp-palette-group__title">
												{ __(
													'THEME',
													'mrkwp-freemius'
												) }
											</div>
											<div className="mrkwp-palette-grid">
												{ themeColors.map(
													( item, index ) => (
														<button
															key={ `theme-${ index }` }
															type="button"
															className={ `mrkwp-palette-circle ${
																isSameColor(
																	value,
																	item.color
																)
																	? 'is-active'
																	: ''
															}` }
															style={ {
																backgroundColor:
																	item.color,
															} }
															onClick={ () =>
																onChange(
																	item.color
																)
															}
															title={
																item.name
																	? `${ item.name } (${ item.color })`
																	: item.color
															}
															aria-label={
																item.name ||
																item.color
															}
														/>
													)
												) }
											</div>
										</div>
									) }

									{ /* Default Core Colors Section */ }
									{ defaultColors.length > 0 && (
										<div className="mrkwp-palette-group">
											<div className="mrkwp-palette-group__title">
												{ __(
													'DEFAULT',
													'mrkwp-freemius'
												) }
											</div>
											<div className="mrkwp-palette-grid">
												{ defaultColors.map(
													( item, index ) => (
														<button
															key={ `default-${ index }` }
															type="button"
															className={ `mrkwp-palette-circle ${
																isSameColor(
																	value,
																	item.color
																)
																	? 'is-active'
																	: ''
															}` }
															style={ {
																backgroundColor:
																	item.color,
															} }
															onClick={ () =>
																onChange(
																	item.color
																)
															}
															title={
																item.name
																	? `${ item.name } (${ item.color })`
																	: item.color
															}
															aria-label={
																item.name ||
																item.color
															}
														/>
													)
												) }
											</div>
										</div>
									) }
								</div>
							) }
						</div>
					</Popover>
				) }
			</div>
		</div>
	);
}
