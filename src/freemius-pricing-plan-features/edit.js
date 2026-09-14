import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import './style.scss';

const ALLOWED_BLOCKS = [ 'mrkwp/freemius-pricing-plan-feature-item' ];
const TEMPLATE = [
	[
		'mrkwp/freemius-pricing-plan-feature-item',
		{
			text: __( 'Unlimited personal files', 'mrkwp-freemius' ),
			isIncluded: true,
		},
	],
	[
		'mrkwp/freemius-pricing-plan-feature-item',
		{ text: __( 'Email support', 'mrkwp-freemius' ), isIncluded: true },
	],
	[
		'mrkwp/freemius-pricing-plan-feature-item',
		{ text: __( 'CSV data export', 'mrkwp-freemius' ), isIncluded: true },
	],
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'mrkwp-pricing-features-list',
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: false,
	} );

	return <ul { ...innerBlocksProps } />;
}
