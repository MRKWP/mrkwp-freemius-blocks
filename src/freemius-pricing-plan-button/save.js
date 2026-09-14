import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		buttonText,
		planId,
		pluginId,
		publicKey,
		license,
		productName,
		isTrial,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mrkwp-pricing-plan__button-wrap',
	} );

	return (
		<div { ...blockProps }>
			<button
				type="button"
				className="mrkwp-freemius-checkout-btn"
				data-plugin-id={ pluginId }
				data-plan-id={ planId }
				data-public-key={ publicKey }
				data-license={ license }
				data-product-name={ productName }
				data-trial={ isTrial ? 'true' : 'false' }
				data-billing-cycle="annual"
			>
				<RichText.Content tagName="span" value={ buttonText } />
			</button>
		</div>
	);
}
