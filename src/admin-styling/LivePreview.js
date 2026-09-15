import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function LivePreview( { styles, deviceView } ) {
	const [ billingCycle, setBillingCycle ] = useState( 'annual' );

	const previewStyle = {
		'--mrkwp-bg': styles.bg,
		'--mrkwp-text': styles.text,
		'--mrkwp-text-muted': styles.textMuted,
		'--mrkwp-accent': styles.accent,
		'--mrkwp-accent-text': styles.accentText,
		'--mrkwp-feature-highlight': styles.featureHighlight,
		'--mrkwp-border': styles.border,
		'--mrkwp-toggle-bg': styles.toggleBg,
		'--mrkwp-toggle-active-bg': styles.toggleActiveBg,
		'--mrkwp-toggle-active-text': styles.toggleActiveText,
		'--mrkwp-btn-bg': styles.btnBg,
		'--mrkwp-btn-color': styles.btnColor,
		'--mrkwp-btn-hover-bg': styles.btnHoverBg,
		'--mrkwp-card-shadow': styles.cardShadow,
		'--mrkwp-card-shadow-hover': styles.cardShadowHover,
		'--mrkwp-highlight-shadow': styles.highlightShadow,
		'--mrkwp-card-radius': styles.cardRadius,
		'--mrkwp-btn-radius': styles.btnRadius,
	};

	const checkmarkSvg = (
		<span className="mrkwp-pricing-feature__icon" aria-hidden="true">
			<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
				<path
					fillRule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clipRule="evenodd"
				/>
			</svg>
		</span>
	);

	return (
		<div
			className={ `mrkwp-preview-device-wrap mrkwp-preview-device--${ deviceView }` }
		>
			<div
				className="mrkwp-pricing-table-container columns-3"
				style={ previewStyle }
			>
				<div className="mrkwp-pricing-table__layout plans-count-3">
					{ /* Header */ }
					<div className="mrkwp-pricing-table__header">
						<div className="mrkwp-pricing-table__header-content">
							<h2 className="mrkwp-pricing-table__title">
								{ __( 'Plans & Pricing', 'mrkwp-freemius' ) }
							</h2>
							<p className="mrkwp-pricing-table__subtitle">
								{ __(
									'Choose the plan that fits your business needs. Simple pricing, no surprises.',
									'mrkwp-freemius'
								) }
							</p>
						</div>

						<div className="mrkwp-pricing-toggle-wrapper">
							<div
								className="mrkwp-pricing-toggle"
								role="group"
								aria-label="Billing cycle toggle"
							>
								<button
									type="button"
									className={ `mrkwp-pricing-toggle__btn ${
										billingCycle === 'annual'
											? 'is-active'
											: ''
									}` }
									onClick={ () =>
										setBillingCycle( 'annual' )
									}
								>
									{ __( 'Annual', 'mrkwp-freemius' ) }
								</button>
								<button
									type="button"
									className={ `mrkwp-pricing-toggle__btn ${
										billingCycle === 'lifetime'
											? 'is-active'
											: ''
									}` }
									onClick={ () =>
										setBillingCycle( 'lifetime' )
									}
								>
									{ __( 'Lifetime', 'mrkwp-freemius' ) }
								</button>
							</div>
						</div>
					</div>

					{ /* Plan 1: Starter */ }
					<div className="mrkwp-pricing-plan">
						<div className="mrkwp-pricing-plan__inner">
							<div className="mrkwp-pricing-plan__header-wrapper">
								<h3 className="mrkwp-pricing-plan__title">
									{ __( 'Starter', 'mrkwp-freemius' ) }
								</h3>
								<p className="mrkwp-pricing-plan__subtitle">
									{ __(
										'Ideal for small side projects',
										'mrkwp-freemius'
									) }
								</p>
							</div>

							<div className="mrkwp-pricing-plan-price">
								<div className="mrkwp-price mrkwp-price--free is-active">
									<span className="mrkwp-price__amount">
										{ __( 'Free', 'mrkwp-freemius' ) }
									</span>
								</div>
							</div>

							<ul className="mrkwp-pricing-plan-features">
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Unlimited personal files',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Email community support',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'CSV data exports',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Basic analytics dashboard',
											'mrkwp-freemius'
										) }
									</span>
								</li>
							</ul>

							<div className="mrkwp-pricing-plan__button-wrap">
								<button
									type="button"
									className="mrkwp-freemius-checkout-btn"
								>
									{ __( 'Try for free', 'mrkwp-freemius' ) }
								</button>
							</div>
						</div>
					</div>

					{ /* Plan 2: Professional (Highlighted) */ }
					<div className="mrkwp-pricing-plan is-highlighted">
						<div className="mrkwp-pricing-plan__badge">
							{ __( 'MOST POPULAR PLAN', 'mrkwp-freemius' ) }
						</div>
						<div className="mrkwp-pricing-plan__inner">
							<div className="mrkwp-pricing-plan__header-wrapper">
								<h3 className="mrkwp-pricing-plan__title">
									{ __( 'Professional', 'mrkwp-freemius' ) }
								</h3>
								<p className="mrkwp-pricing-plan__subtitle">
									{ __(
										'For freelancers and startups',
										'mrkwp-freemius'
									) }
								</p>
							</div>

							<div className="mrkwp-pricing-plan-price">
								{ billingCycle === 'annual' ? (
									<div className="mrkwp-price mrkwp-price--annual is-active">
										<span className="mrkwp-price__currency">
											$
										</span>
										<span className="mrkwp-price__amount">
											15
										</span>
										<span className="mrkwp-price__period">
											{ __(
												'/per user',
												'mrkwp-freemius'
											) }
										</span>
									</div>
								) : (
									<div className="mrkwp-price mrkwp-price--lifetime is-active">
										<span className="mrkwp-price__currency">
											$
										</span>
										<span className="mrkwp-price__amount">
											79
										</span>
										<span className="mrkwp-price__period">
											{ __(
												'one-time',
												'mrkwp-freemius'
											) }
										</span>
									</div>
								) }
							</div>

							<ul className="mrkwp-pricing-plan-features">
								<li className="mrkwp-pricing-feature is-highlighted">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'All starter features +',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Up to 5 team accounts',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Custom dashboards',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Team collaboration tools',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Priority email support',
											'mrkwp-freemius'
										) }
									</span>
								</li>
							</ul>

							<div className="mrkwp-pricing-plan__button-wrap">
								<button
									type="button"
									className="mrkwp-freemius-checkout-btn"
								>
									{ __( 'Select plan', 'mrkwp-freemius' ) }
								</button>
							</div>
						</div>
					</div>

					{ /* Plan 3: Organization */ }
					<div className="mrkwp-pricing-plan">
						<div className="mrkwp-pricing-plan__inner">
							<div className="mrkwp-pricing-plan__header-wrapper">
								<h3 className="mrkwp-pricing-plan__title">
									{ __( 'Organization', 'mrkwp-freemius' ) }
								</h3>
								<p className="mrkwp-pricing-plan__subtitle">
									{ __(
										'For fast-growing scaleups',
										'mrkwp-freemius'
									) }
								</p>
							</div>

							<div className="mrkwp-pricing-plan-price">
								{ billingCycle === 'annual' ? (
									<div className="mrkwp-price mrkwp-price--annual is-active">
										<span className="mrkwp-price__currency">
											$
										</span>
										<span className="mrkwp-price__amount">
											30
										</span>
										<span className="mrkwp-price__period">
											{ __(
												'/per user',
												'mrkwp-freemius'
											) }
										</span>
									</div>
								) : (
									<div className="mrkwp-price mrkwp-price--lifetime is-active">
										<span className="mrkwp-price__currency">
											$
										</span>
										<span className="mrkwp-price__amount">
											149
										</span>
										<span className="mrkwp-price__period">
											{ __(
												'one-time',
												'mrkwp-freemius'
											) }
										</span>
									</div>
								) }
							</div>

							<ul className="mrkwp-pricing-plan-features">
								<li className="mrkwp-pricing-feature is-highlighted">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'All professional features +',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Enterprise security suite',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Single Sign-On (SSO)',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Custom contract terms',
											'mrkwp-freemius'
										) }
									</span>
								</li>
								<li className="mrkwp-pricing-feature">
									{ checkmarkSvg }
									<span className="mrkwp-pricing-feature__text">
										{ __(
											'Dedicated phone support',
											'mrkwp-freemius'
										) }
									</span>
								</li>
							</ul>

							<div className="mrkwp-pricing-plan__button-wrap">
								<button
									type="button"
									className="mrkwp-freemius-checkout-btn"
								>
									{ __( 'Select plan', 'mrkwp-freemius' ) }
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
