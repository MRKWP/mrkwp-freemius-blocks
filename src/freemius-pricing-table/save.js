import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { defaultCycle, columns, pluginId, publicKey, productName } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: `mrkwp-pricing-table-container columns-${ columns }`,
		'data-plugin-id': pluginId || undefined,
		'data-public-key': publicKey || undefined,
		'data-product-name': productName || undefined,
		'data-default-cycle': defaultCycle || 'annual',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: `mrkwp-pricing-table__layout plans-count-${ columns }`,
	} );

	return (
		<section { ...blockProps }>
			<div { ...innerBlocksProps } />
		</section>
	);
}
