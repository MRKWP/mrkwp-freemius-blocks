import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, subtitle, textAlign, titleTag = 'h3' } = attributes;

	const blockProps = useBlockProps.save( {
		className: [
			'mrkwp-pricing-plan__header-wrapper',
			textAlign ? `has-text-align-${ textAlign }` : '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<div { ...blockProps }>
			{ title && (
				<RichText.Content
					tagName={ titleTag }
					className="mrkwp-pricing-plan__title"
					value={ title }
				/>
			) }
			{ subtitle && (
				<RichText.Content
					tagName="p"
					className="mrkwp-pricing-plan__subtitle"
					value={ subtitle }
				/>
			) }
		</div>
	);
}
