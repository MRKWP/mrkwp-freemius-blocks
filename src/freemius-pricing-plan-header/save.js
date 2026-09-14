import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, subtitle } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mrkwp-pricing-plan__header-wrapper',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h3"
				className="mrkwp-pricing-plan__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="mrkwp-pricing-plan__subtitle"
				value={ subtitle }
			/>
		</div>
	);
}
