import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import './style.scss';

const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];

const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			content: __( 'Plans & Pricing', 'mrkwp-freemius' ),
			textAlign: 'center',
			className: 'mrkwp-pricing-table__title',
		},
	],
	[
		'core/paragraph',
		{
			content: __(
				'Choose the plan that fits your needs. All plans include essential features to get you started, with options to scale as you grow. No hidden fees and the flexibility to change anytime.',
				'mrkwp-freemius'
			),
			align: 'center',
			className: 'mrkwp-pricing-table__subtitle',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { showToggle, annualLabel, lifetimeLabel, defaultCycle } = attributes;

	const blockProps = useBlockProps( {
		className: 'mrkwp-pricing-table__header',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'mrkwp-pricing-table__header-content' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Billing Toggle Settings', 'mrkwp-freemius' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Show Billing Toggle', 'mrkwp-freemius' ) }
						help={ __(
							'Allows visitors to switch between Annual and Lifetime pricing.',
							'mrkwp-freemius'
						) }
						checked={ showToggle }
						onChange={ ( val ) =>
							setAttributes( { showToggle: val } )
						}
					/>

					{ showToggle && (
						<>
							<TextControl
								label={ __(
									'Annual Option Label',
									'mrkwp-freemius'
								) }
								value={ annualLabel }
								onChange={ ( val ) =>
									setAttributes( { annualLabel: val } )
								}
							/>
							<TextControl
								label={ __(
									'Lifetime Option Label',
									'mrkwp-freemius'
								) }
								value={ lifetimeLabel }
								onChange={ ( val ) =>
									setAttributes( { lifetimeLabel: val } )
								}
							/>
							<ToggleControl
								label={ __(
									'Default to Lifetime',
									'mrkwp-freemius'
								) }
								checked={ defaultCycle === 'lifetime' }
								onChange={ ( isLifetime ) =>
									setAttributes( {
										defaultCycle: isLifetime
											? 'lifetime'
											: 'annual',
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />

				{ showToggle && (
					<div className="mrkwp-pricing-toggle-wrapper">
						<div
							className="mrkwp-pricing-toggle"
							role="group"
							aria-label={ __(
								'Billing cycle toggle',
								'mrkwp-freemius'
							) }
						>
							<button
								type="button"
								className={ `mrkwp-pricing-toggle__btn ${
									defaultCycle === 'annual' ? 'is-active' : ''
								}` }
								onClick={ () =>
									setAttributes( { defaultCycle: 'annual' } )
								}
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
								onClick={ () =>
									setAttributes( {
										defaultCycle: 'lifetime',
									} )
								}
							>
								{ lifetimeLabel }
							</button>
						</div>
					</div>
				) }
			</div>
		</>
	);
}
