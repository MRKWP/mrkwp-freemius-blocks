import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		subtitle,
		showToggle,
		annualLabel,
		lifetimeLabel,
		defaultCycle,
		columns,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `mrkwp-pricing-table-container columns-${ columns }`,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: `mrkwp-pricing-table__grid plans-count-${ columns }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="mrkwp-pricing-table__header">
				<RichText.Content
					tagName="h2"
					className="mrkwp-pricing-table__title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="mrkwp-pricing-table__subtitle"
					value={ subtitle }
				/>

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
									defaultCycle === 'lifetime'
										? 'is-active'
										: ''
								}` }
								data-cycle="lifetime"
							>
								{ lifetimeLabel }
							</button>
						</div>
					</div>
				) }
			</div>

			<div { ...innerBlocksProps } />
		</section>
	);
}
