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

	// Check whether credentials exist on this button or parent table context
	const hasCredentials = Boolean(
		( pluginId || context[ 'mrkwp/pluginId' ] ) &&
			( publicKey || context[ 'mrkwp/publicKey' ] )
	);

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
						help={ __(
							'Optional name used for analytics and tracking events.',
							'mrkwp-freemius'
						) }
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
						{ hasCredentials
							? __(
									'Inheriting credentials from parent table. You can override them below if this plan belongs to a different Freemius plugin.',
									'mrkwp-freemius'
							  )
							: __(
									'Enter credentials here or set them once on the parent Pricing Table block.',
									'mrkwp-freemius'
							  ) }
					</p>
					<TextControl
						label={ __( 'Plugin ID Override', 'mrkwp-freemius' ) }
						value={ pluginId }
						onChange={ ( val ) =>
							setAttributes( { pluginId: val } )
						}
						placeholder={ context[ 'mrkwp/pluginId' ] || '' }
					/>
					<TextControl
						label={ __( 'Public Key Override', 'mrkwp-freemius' ) }
						value={ publicKey }
						onChange={ ( val ) =>
							setAttributes( { publicKey: val } )
						}
						placeholder={ context[ 'mrkwp/publicKey' ] || '' }
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
