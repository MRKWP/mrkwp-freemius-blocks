import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import './style.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const {
		buttonText,
		planId,
		pluginId,
		publicKey,
		license,
		productName,
		isTrial,
	} = attributes;

	const tablePluginId = context[ 'mrkwp/pluginId' ] || '';
	const tablePublicKey = context[ 'mrkwp/publicKey' ] || '';
	const tableProductName = context[ 'mrkwp/productName' ] || '';

	const effectivePluginId = pluginId || tablePluginId;
	const effectivePublicKey = publicKey || tablePublicKey;
	const isInherited = ! pluginId && Boolean( tablePluginId );

	const blockProps = useBlockProps( {
		className: 'mrkwp-pricing-plan__button-wrap',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Freemius Checkout Settings',
						'mrkwp-freemius'
					) }
					initialOpen={ true }
				>
					{ effectivePluginId ? (
						<div
							style={ {
								padding: '10px 12px',
								backgroundColor: '#f0fdf4',
								border: '1px solid #bbf7d0',
								borderRadius: '6px',
								marginBottom: '16px',
								fontSize: '12px',
								color: '#166534',
								lineHeight: '1.4',
							} }
						>
							<strong>
								{ isInherited
									? __(
											'✓ Using Table Credentials:',
											'mrkwp-freemius'
									  )
									: __(
											'★ Using Button Override:',
											'mrkwp-freemius'
									  ) }
							</strong>
							<div>
								{ __( 'Plugin ID: ', 'mrkwp-freemius' ) }
								<code>{ effectivePluginId }</code>
							</div>
							<div>
								{ __( 'Public Key: ', 'mrkwp-freemius' ) }
								<code>
									{ effectivePublicKey
										? `${ effectivePublicKey.substring(
												0,
												10
										  ) }…`
										: __( 'None', 'mrkwp-freemius' ) }
								</code>
							</div>
						</div>
					) : (
						<div
							style={ {
								padding: '10px 12px',
								backgroundColor: '#fffbeb',
								border: '1px solid #fde68a',
								borderRadius: '6px',
								marginBottom: '16px',
								fontSize: '12px',
								color: '#92400e',
								lineHeight: '1.4',
							} }
						>
							<strong>
								⚠️ { __( 'Notice: ', 'mrkwp-freemius' ) }
							</strong>
							{ __(
								'No Plugin ID or Public Key found. Set them on the parent Freemius Pricing Table block (or override below).',
								'mrkwp-freemius'
							) }
						</div>
					) }

					<TextControl
						label={ __( 'Plan ID', 'mrkwp-freemius' ) }
						value={ planId }
						onChange={ ( val ) => setAttributes( { planId: val } ) }
						help={ __(
							'The Freemius Plan ID for this tier.',
							'mrkwp-freemius'
						) }
					/>
					<TextControl
						label={ __(
							'Licenses Count / Type',
							'mrkwp-freemius'
						) }
						value={ license }
						onChange={ ( val ) =>
							setAttributes( { license: val } )
						}
						help={ __(
							'E.g. 1, 5, or unlimited.',
							'mrkwp-freemius'
						) }
					/>
					<TextControl
						label={ __( 'Product Name', 'mrkwp-freemius' ) }
						value={ productName }
						onChange={ ( val ) =>
							setAttributes( { productName: val } )
						}
						placeholder={ tableProductName || '' }
						help={
							tableProductName && ! productName
								? `${ __(
										'Inherited from table: ',
										'mrkwp-freemius'
								  ) }${ tableProductName }`
								: __(
										'Optional name used for analytics and tracking events.',
										'mrkwp-freemius'
								  )
						}
					/>
					<ToggleControl
						label={ __( 'Free Trial Checkout', 'mrkwp-freemius' ) }
						help={ __(
							'Opens checkout in trial mode without upfront charge.',
							'mrkwp-freemius'
						) }
						checked={ isTrial }
						onChange={ ( val ) =>
							setAttributes( { isTrial: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __(
						'Credentials Override (Optional)',
						'mrkwp-freemius'
					) }
					initialOpen={ false }
				>
					<p className="description">
						{ isInherited
							? __(
									'Currently inheriting credentials from the parent Pricing Table. You can override them below if this plan uses a different Freemius plugin.',
									'mrkwp-freemius'
							  )
							: __(
									'Custom credentials for this button. Leave blank to inherit from the parent Pricing Table.',
									'mrkwp-freemius'
							  ) }
					</p>
					<TextControl
						label={ __( 'Plugin ID Override', 'mrkwp-freemius' ) }
						value={ pluginId }
						onChange={ ( val ) =>
							setAttributes( { pluginId: val } )
						}
						placeholder={ tablePluginId || '' }
					/>
					<TextControl
						label={ __( 'Public Key Override', 'mrkwp-freemius' ) }
						value={ publicKey }
						onChange={ ( val ) =>
							setAttributes( { publicKey: val } )
						}
						placeholder={ tablePublicKey || '' }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="mrkwp-freemius-checkout-btn">
					<RichText
						tagName="span"
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
						placeholder={ __( 'Select plan', 'mrkwp-freemius' ) }
					/>
				</div>
			</div>
		</>
	);
}
