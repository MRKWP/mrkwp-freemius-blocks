import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';

const ALLOWED_BLOCKS = [
	'mrkwp/freemius-pricing-table-header',
	'mrkwp/freemius-pricing-plan',
];

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

const DEFAULT_TABLE_TEMPLATE = [
	[
		'mrkwp/freemius-pricing-table-header',
		{},
		[
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
		],
	],
	DEFAULT_PLANS_TEMPLATE[ 0 ],
	DEFAULT_PLANS_TEMPLATE[ 1 ],
	DEFAULT_PLANS_TEMPLATE[ 2 ],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { columns, pluginId, publicKey, productName } = attributes;

	// Access inner blocks
	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);
	const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	// Handle automatic column removal / addition when slider changes
	const handleColumnsChange = ( newCount ) => {
		const planBlocks = innerBlocks.filter(
			( block ) => block.name === 'mrkwp/freemius-pricing-plan'
		);
		const currentPlanCount = planBlocks.length;
		setAttributes( { columns: newCount } );

		if ( newCount < currentPlanCount ) {
			// Automatically remove extra plan blocks from the end
			for ( let i = currentPlanCount - 1; i >= newCount; i-- ) {
				if ( planBlocks[ i ] ) {
					removeBlock( planBlocks[ i ].clientId );
				}
			}
		} else if ( newCount > currentPlanCount ) {
			// Automatically create and insert new plan blocks
			for ( let i = currentPlanCount; i < newCount; i++ ) {
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
				insertBlock( newPlanBlock, undefined, clientId );
			}
		}
	};

	const blockProps = useBlockProps( {
		className: `mrkwp-pricing-table-container columns-${ columns }`,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: `mrkwp-pricing-table__layout plans-count-${ columns }` },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: DEFAULT_TABLE_TEMPLATE,
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
					<TextControl
						label={ __( 'Product Name', 'mrkwp-freemius' ) }
						value={ productName || '' }
						onChange={ ( val ) =>
							setAttributes( { productName: val } )
						}
						help={ __(
							'Product name used for analytics tracking and default plan labels.',
							'mrkwp-freemius'
						) }
						placeholder={ __( 'e.g. My Plugin', 'mrkwp-freemius' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div { ...innerBlocksProps } />
			</section>
		</>
	);
}
