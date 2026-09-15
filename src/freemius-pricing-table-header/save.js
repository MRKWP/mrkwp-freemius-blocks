import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showToggle, annualLabel, lifetimeLabel, defaultCycle } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mrkwp-pricing-table__header',
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'mrkwp-pricing-table__header-content',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />

			{ showToggle && (
				<div className="mrkwp-pricing-toggle-wrapper">
					<div
						className="mrkwp-pricing-toggle"
						role="group"
						aria-label="Billing cycle toggle"
					>
						<button
							type="button"
							className={ `mrkwp-pricing-toggle__btn ${
								defaultCycle === 'annual' ? 'is-active' : ''
							}` }
							data-cycle="annual"
						>
							{ annualLabel }
						</button>
						<button
							type="button"
							className={ `mrkwp-pricing-toggle__btn ${
								defaultCycle === 'lifetime' ? 'is-active' : ''
							}` }
							data-cycle="lifetime"
						>
							{ lifetimeLabel }
						</button>
					</div>
				</div>
			) }
		</div>
	);
}
