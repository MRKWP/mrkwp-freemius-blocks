import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './style.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const {
		isFree,
		freeText,
		currency,
		annualPrice,
		annualPeriod,
		lifetimePrice,
		lifetimePeriod,
	} = attributes;

	const defaultCycle = context[ 'mrkwp/defaultCycle' ] || 'annual';
	const [ selectedTab, setSelectedTab ] = useState( defaultCycle );

	const blockProps = useBlockProps( {
		className: 'mrkwp-pricing-plan-price',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Price Settings', 'mrkwp-freemius' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Free Plan', 'mrkwp-freemius' ) }
						checked={ isFree }
						onChange={ ( val ) => setAttributes( { isFree: val } ) }
					/>

					{ isFree ? (
						<TextControl
							label={ __( 'Free Label', 'mrkwp-freemius' ) }
							value={ freeText }
							onChange={ ( val ) =>
								setAttributes( { freeText: val } )
							}
						/>
					) : (
						<>
							<TextControl
								label={ __(
									'Currency Symbol',
									'mrkwp-freemius'
								) }
								value={ currency }
								onChange={ ( val ) =>
									setAttributes( { currency: val } )
								}
							/>

							<hr />
							<p>
								<strong>
									{ __( 'Annual Price', 'mrkwp-freemius' ) }
								</strong>
							</p>
							<TextControl
								label={ __( 'Amount', 'mrkwp-freemius' ) }
								value={ annualPrice }
								onChange={ ( val ) =>
									setAttributes( { annualPrice: val } )
								}
							/>
							<TextControl
								label={ __(
									'Period / Suffix',
									'mrkwp-freemius'
								) }
								value={ annualPeriod }
								onChange={ ( val ) =>
									setAttributes( { annualPeriod: val } )
								}
								placeholder={ __(
									'/per year',
									'mrkwp-freemius'
								) }
							/>

							<hr />
							<p>
								<strong>
									{ __( 'Lifetime Price', 'mrkwp-freemius' ) }
								</strong>
							</p>
							<TextControl
								label={ __( 'Amount', 'mrkwp-freemius' ) }
								value={ lifetimePrice }
								onChange={ ( val ) =>
									setAttributes( { lifetimePrice: val } )
								}
							/>
							<TextControl
								label={ __(
									'Period / Suffix',
									'mrkwp-freemius'
								) }
								value={ lifetimePeriod }
								onChange={ ( val ) =>
									setAttributes( { lifetimePeriod: val } )
								}
								placeholder={ __(
									'one-time',
									'mrkwp-freemius'
								) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isFree ? (
					<div className="mrkwp-pricing-plan-price__wrapper is-free">
						<RichText
							tagName="span"
							className="mrkwp-pricing-plan-price__amount"
							value={ freeText }
							onChange={ ( val ) =>
								setAttributes( { freeText: val } )
							}
							placeholder={ __( 'Free', 'mrkwp-freemius' ) }
						/>
					</div>
				) : (
					<TabPanel
						className="mrkwp-pricing-price-tabs"
						activeClass="is-active"
						initialTabName={ selectedTab }
						onSelect={ ( tabName ) => setSelectedTab( tabName ) }
						tabs={ [
							{
								name: 'annual',
								title: __( 'Annual', 'mrkwp-freemius' ),
								className: 'mrkwp-tab-annual',
							},
							{
								name: 'lifetime',
								title: __( 'Lifetime', 'mrkwp-freemius' ),
								className: 'mrkwp-tab-lifetime',
							},
						] }
					>
						{ ( tab ) => (
							<div className="mrkwp-pricing-plan-price__wrapper">
								<RichText
									tagName="span"
									className="mrkwp-pricing-plan-price__currency"
									value={ currency }
									onChange={ ( val ) =>
										setAttributes( { currency: val } )
									}
									placeholder="$"
								/>
								<RichText
									tagName="span"
									className="mrkwp-pricing-plan-price__amount"
									value={
										tab.name === 'annual'
											? annualPrice
											: lifetimePrice
									}
									onChange={ ( val ) => {
										if ( tab.name === 'annual' ) {
											setAttributes( {
												annualPrice: val,
											} );
										} else {
											setAttributes( {
												lifetimePrice: val,
											} );
										}
									} }
									placeholder="0"
								/>
								<RichText
									tagName="span"
									className="mrkwp-pricing-plan-price__period"
									value={
										tab.name === 'annual'
											? annualPeriod
											: lifetimePeriod
									}
									onChange={ ( val ) => {
										if ( tab.name === 'annual' ) {
											setAttributes( {
												annualPeriod: val,
											} );
										} else {
											setAttributes( {
												lifetimePeriod: val,
											} );
										}
									} }
									placeholder={
										tab.name === 'annual'
											? '/year'
											: 'one-time'
									}
								/>
							</div>
						) }
					</TabPanel>
				) }
			</div>
		</>
	);
}
