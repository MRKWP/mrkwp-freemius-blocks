import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	ColorPalette,
} from '@wordpress/components';
import './style.scss';

const ALLOWED_BLOCKS = [
	'mrkwp/freemius-pricing-plan-header',
	'mrkwp/freemius-pricing-plan-price',
	'mrkwp/freemius-pricing-plan-features',
	'mrkwp/freemius-pricing-plan-button',
];

const TEMPLATE = [
	[ 'mrkwp/freemius-pricing-plan-header', {} ],
	[ 'mrkwp/freemius-pricing-plan-price', {} ],
	[ 'mrkwp/freemius-pricing-plan-features', {} ],
	[ 'mrkwp/freemius-pricing-plan-button', {} ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { isHighlighted, badgeText, highlightColor } = attributes;

	const style = highlightColor
		? { '--mrkwp-card-highlight-color': highlightColor }
		: {};

	const blockProps = useBlockProps( {
		className: `mrkwp-pricing-plan ${
			isHighlighted ? 'is-highlighted' : ''
		}`,
		style,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'mrkwp-pricing-plan__inner' },
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
					title={ __( 'Plan Card Highlight', 'mrkwp-freemius' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __(
							'Highlight Plan (Most Popular)',
							'mrkwp-freemius'
						) }
						help={ __(
							'Adds a prominent highlight banner and border to elevate this plan.',
							'mrkwp-freemius'
						) }
						checked={ isHighlighted }
						onChange={ ( val ) =>
							setAttributes( { isHighlighted: val } )
						}
					/>

					{ isHighlighted && (
						<>
							<TextControl
								label={ __( 'Badge Text', 'mrkwp-freemius' ) }
								value={ badgeText }
								onChange={ ( val ) =>
									setAttributes( { badgeText: val } )
								}
								placeholder={ __(
									'MOST POPULAR PLAN',
									'mrkwp-freemius'
								) }
							/>
							<p>
								<strong>
									{ __(
										'Highlight Accent Color',
										'mrkwp-freemius'
									) }
								</strong>
							</p>
							<ColorPalette
								value={ highlightColor }
								onChange={ ( val ) =>
									setAttributes( {
										highlightColor: val || '',
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isHighlighted && (
					<div
						className="mrkwp-pricing-plan__badge"
						aria-hidden="true"
					>
						{ badgeText ||
							__( 'MOST POPULAR PLAN', 'mrkwp-freemius' ) }
					</div>
				) }
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
