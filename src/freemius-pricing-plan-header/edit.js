import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './style.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, subtitle } = attributes;

	const blockProps = useBlockProps( {
		className: 'mrkwp-pricing-plan__header-wrapper',
	} );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h3"
				className="mrkwp-pricing-plan__title"
				value={ title }
				onChange={ ( val ) => setAttributes( { title: val } ) }
				placeholder={ __( 'Plan Title', 'mrkwp-freemius' ) }
			/>
			<RichText
				tagName="p"
				className="mrkwp-pricing-plan__subtitle"
				value={ subtitle }
				onChange={ ( val ) => setAttributes( { subtitle: val } ) }
				placeholder={ __( 'Plan Subtitle', 'mrkwp-freemius' ) }
			/>
		</div>
	);
}
