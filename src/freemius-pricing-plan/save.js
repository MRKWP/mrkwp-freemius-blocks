import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { isHighlighted, badgeText, highlightColor } = attributes;

	const style = highlightColor
		? { '--mrkwp-card-highlight-color': highlightColor }
		: undefined;

	const blockProps = useBlockProps.save( {
		className: `mrkwp-pricing-plan ${
			isHighlighted ? 'is-highlighted' : ''
		}`,
		style,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'mrkwp-pricing-plan__inner',
	} );

	return (
		<div { ...blockProps }>
			{ isHighlighted && (
				<div className="mrkwp-pricing-plan__badge" aria-hidden="true">
					{ badgeText }
				</div>
			) }
			<div { ...innerBlocksProps } />
		</div>
	);
}
