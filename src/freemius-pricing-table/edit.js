import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';

const ALLOWED_BLOCKS = [ 'mrkwp/freemius-pricing-plan' ];

const DEFAULT_PLANS_TEMPLATE = [
	// Plan 1: Starter
	[
		'mrkwp/freemius-pricing-plan',
		{ isHighlighted: false },
		[
			[
				'mrkwp/freemius-pricing-plan-header',
				{
					title: __( 'Starter', 'mrkwp-freemius' ),
					subtitle: __(
						'Ideal for small projects',
						'mrkwp-freemius'
					),
				},
			],
			[
				'mrkwp/freemius-pricing-plan-price',
				{
					isFree: true,
					freeText: __( 'Free', 'mrkwp-freemius' ),
					annualPrice: '0',
					lifetimePrice: '0',
				},
			],
			[
				'mrkwp/freemius-pricing-plan-features',
				{},
				[
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Unlimited personal files',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __( 'Email support', 'mrkwp-freemius' ),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __( 'CSV data export', 'mrkwp-freemius' ),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Basic analytics dashboard',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'1,000 API calls per month',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
				],
			],
			[
				'mrkwp/freemius-pricing-plan-button',
				{
					buttonText: __( 'Try for free', 'mrkwp-freemius' ),
					license: '1',
					isTrial: false,
				},
			],
		],
	],
	// Plan 2: Professional (Highlighted)
	[
		'mrkwp/freemius-pricing-plan',
		{
			isHighlighted: true,
			badgeText: __( 'MOST POPULAR PLAN', 'mrkwp-freemius' ),
		},
		[
			[
				'mrkwp/freemius-pricing-plan-header',
				{
					title: __( 'Professional', 'mrkwp-freemius' ),
					subtitle: __(
						'For freelancers and startups',
						'mrkwp-freemius'
					),
				},
			],
			[
				'mrkwp/freemius-pricing-plan-price',
				{
					isFree: false,
					currency: '$',
					annualPrice: '15',
					annualPeriod: __( '/per user', 'mrkwp-freemius' ),
					lifetimePrice: '79',
					lifetimePeriod: __( 'one-time', 'mrkwp-freemius' ),
				},
			],
			[
				'mrkwp/freemius-pricing-plan-features',
				{},
				[
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'All starter features +',
								'mrkwp-freemius'
							),
							isHighlighted: true,
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Up to 5 user accounts',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Team collaboration tools',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __( 'Custom dashboards', 'mrkwp-freemius' ),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Multiple data export formats',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Basic custom integrations',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
				],
			],
			[
				'mrkwp/freemius-pricing-plan-button',
				{
					buttonText: __( 'Select plan', 'mrkwp-freemius' ),
					license: '1',
					isTrial: false,
				},
			],
		],
	],
	// Plan 3: Organization
	[
		'mrkwp/freemius-pricing-plan',
		{ isHighlighted: false },
		[
			[
				'mrkwp/freemius-pricing-plan-header',
				{
					title: __( 'Organization', 'mrkwp-freemius' ),
					subtitle: __(
						'For fast-growing businesses',
						'mrkwp-freemius'
					),
				},
			],
			[
				'mrkwp/freemius-pricing-plan-price',
				{
					isFree: false,
					currency: '$',
					annualPrice: '30',
					annualPeriod: __( '/per user', 'mrkwp-freemius' ),
					lifetimePrice: '149',
					lifetimePeriod: __( 'one-time', 'mrkwp-freemius' ),
				},
			],
			[
				'mrkwp/freemius-pricing-plan-features',
				{},
				[
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'All professional features +',
								'mrkwp-freemius'
							),
							isHighlighted: true,
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Enterprise security suite',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Single Sign-On (SSO)',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Custom contract terms',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Dedicated phone support',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __(
								'Custom integration support',
								'mrkwp-freemius'
							),
							isIncluded: true,
						},
					],
					[
						'mrkwp/freemius-pricing-plan-feature-item',
						{
							text: __( 'Compliance tools', 'mrkwp-freemius' ),
							isIncluded: true,
						},
					],
				],
			],
			[
				'mrkwp/freemius-pricing-plan-button',
				{
					buttonText: __( 'Select plan', 'mrkwp-freemius' ),
					license: '5',
					isTrial: false,
				},
			],
		],
	],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		title,
		subtitle,
		showToggle,
		annualLabel,
		lifetimeLabel,
		defaultCycle,
		columns,
		pluginId,
		publicKey,
	} = attributes;

	// Access inner blocks
	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);
	const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	// Handle automatic column removal / addition when slider changes
	const handleColumnsChange = ( newCount ) => {
		const currentCount = innerBlocks.length;
		setAttributes( { columns: newCount } );

		if ( newCount < currentCount ) {
			// Automatically remove extra blocks from the end
			for ( let i = currentCount - 1; i >= newCount; i-- ) {
				if ( innerBlocks[ i ] ) {
					removeBlock( innerBlocks[ i ].clientId );
				}
			}
		} else if ( newCount > currentCount ) {
			// Automatically create and insert new plan blocks
			for ( let i = currentCount; i < newCount; i++ ) {
				const planTemplate =
					DEFAULT_PLANS_TEMPLATE[ i ] || DEFAULT_PLANS_TEMPLATE[ 0 ];
				const newPlanBlock = createBlock(
					planTemplate[ 0 ],
					planTemplate[ 1 ],
					( planTemplate[ 2 ] || [] ).map( ( child ) =>
						createBlock(
							child[ 0 ],
							child[ 1 ],
							( child[ 2 ] || [] ).map( ( grandChild ) =>
								createBlock( grandChild[ 0 ], grandChild[ 1 ] )
							)
						)
					)
				);
				insertBlock( newPlanBlock, i, clientId );
			}
		}
	};

	const blockProps = useBlockProps( {
		className: `mrkwp-pricing-table-container columns-${ columns }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: `mrkwp-pricing-table__grid plans-count-${ columns }` },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: DEFAULT_PLANS_TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Pricing Table Layout', 'mrkwp-freemius' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of Plans', 'mrkwp-freemius' ) }
						value={ columns }
						onChange={ handleColumnsChange }
						min={ 1 }
						max={ 3 }
						help={ __(
							'Controls how many plan cards are displayed in the grid.',
							'mrkwp-freemius'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Annual / Lifetime Toggle', 'mrkwp-freemius' ) }
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

				<PanelBody
					title={ __(
						'Global Freemius Credentials',
						'mrkwp-freemius'
					) }
					initialOpen={ true }
				>
					<p className="description">
						{ __(
							'Configure your Freemius Plugin credentials here. All checkout buttons inside this table will automatically inherit them unless individually overridden.',
							'mrkwp-freemius'
						) }
					</p>
					<TextControl
						label={ __( 'Freemius Plugin ID', 'mrkwp-freemius' ) }
						value={ pluginId }
						onChange={ ( val ) =>
							setAttributes( { pluginId: val } )
						}
						placeholder="1234"
					/>
					<TextControl
						label={ __( 'Freemius Public Key', 'mrkwp-freemius' ) }
						value={ publicKey }
						onChange={ ( val ) =>
							setAttributes( { publicKey: val } )
						}
						placeholder="pk_..."
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="mrkwp-pricing-table__header">
					<RichText
						tagName="h2"
						className="mrkwp-pricing-table__title"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Plans & Pricing',
							'mrkwp-freemius'
						) }
					/>
					<RichText
						tagName="p"
						className="mrkwp-pricing-table__subtitle"
						value={ subtitle }
						onChange={ ( val ) =>
							setAttributes( { subtitle: val } )
						}
						placeholder={ __(
							'Enter table description…',
							'mrkwp-freemius'
						) }
					/>

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
										defaultCycle === 'annual'
											? 'is-active'
											: ''
									}` }
									onClick={ () =>
										setAttributes( {
											defaultCycle: 'annual',
										} )
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

				<div { ...innerBlocksProps } />
			</section>
		</>
	);
}
