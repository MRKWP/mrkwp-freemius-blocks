import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		isFree,
		freeText,
		currency,
		annualPrice,
		annualPeriod,
		lifetimePrice,
		lifetimePeriod,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'mrkwp-pricing-plan-price',
	} );

	return (
		<div { ...blockProps }>
			{ isFree ? (
				<div className="mrkwp-pricing-plan-price__wrapper is-free">
					<RichText.Content
						tagName="span"
						className="mrkwp-pricing-plan-price__amount"
						value={ freeText }
					/>
				</div>
			) : (
				<>
					<div
						className="mrkwp-pricing-plan-price__wrapper mrkwp-price--annual is-active"
						data-cycle="annual"
					>
						<RichText.Content
							tagName="span"
							className="mrkwp-pricing-plan-price__currency"
							value={ currency }
						/>
						<RichText.Content
							tagName="span"
							className="mrkwp-pricing-plan-price__amount"
							value={ annualPrice }
						/>
						{ annualPeriod && (
							<RichText.Content
								tagName="span"
								className="mrkwp-pricing-plan-price__period"
								value={ annualPeriod }
							/>
						) }
					</div>
					<div
						className="mrkwp-pricing-plan-price__wrapper mrkwp-price--lifetime"
						data-cycle="lifetime"
						style={ { display: 'none' } }
					>
						<RichText.Content
							tagName="span"
							className="mrkwp-pricing-plan-price__currency"
							value={ currency }
						/>
						<RichText.Content
							tagName="span"
							className="mrkwp-pricing-plan-price__amount"
							value={ lifetimePrice }
						/>
						{ lifetimePeriod && (
							<RichText.Content
								tagName="span"
								className="mrkwp-pricing-plan-price__period"
								value={ lifetimePeriod }
							/>
						) }
					</div>
				</>
			) }
		</div>
	);
}
