import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import './style.scss';

function FeatureIcon( { isHighlighted, isIncluded } ) {
	if ( isHighlighted ) {
		return (
			<svg viewBox="0 0 20 20" fill="currentColor">
				<path
					fillRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
					clipRule="evenodd"
				/>
			</svg>
		);
	}

	if ( isIncluded ) {
		return (
			<svg
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.75"
			>
				<circle cx="10" cy="10" r="7.5" />
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M7 10l2 2 4-4"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 20 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75"
		>
			<circle cx="10" cy="10" r="7.5" strokeOpacity="0.4" />
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 12l4-4m0 4L8 8"
			/>
		</svg>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { text, isHighlighted, isIncluded } = attributes;

	const blockProps = useBlockProps( {
		className: `mrkwp-pricing-feature-item ${
			isHighlighted ? 'is-highlighted' : ''
		} ${ ! isIncluded ? 'not-included' : '' }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Feature Settings', 'mrkwp-freemius' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __(
							'Highlight this feature (Accent)',
							'mrkwp-freemius'
						) }
						help={ __(
							'Emphasize this key feature with bold accent styling.',
							'mrkwp-freemius'
						) }
						checked={ isHighlighted }
						onChange={ ( val ) =>
							setAttributes( { isHighlighted: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Included in plan', 'mrkwp-freemius' ) }
						checked={ isIncluded }
						onChange={ ( val ) =>
							setAttributes( { isIncluded: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<li { ...blockProps }>
				<span className="mrkwp-feature-icon" aria-hidden="true">
					<FeatureIcon
						isHighlighted={ isHighlighted }
						isIncluded={ isIncluded }
					/>
				</span>
				<RichText
					tagName="span"
					className="mrkwp-feature-text"
					value={ text }
					onChange={ ( newText ) =>
						setAttributes( { text: newText } )
					}
					placeholder={ __(
						'Enter feature description…',
						'mrkwp-freemius'
					) }
				/>
			</li>
		</>
	);
}
