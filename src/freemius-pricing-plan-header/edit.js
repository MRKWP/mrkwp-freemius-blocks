import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import './editor.scss';
import './style.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, subtitle, textAlign, titleTag = 'h3' } = attributes;

	const blockProps = useBlockProps( {
		className: [
			'mrkwp-pricing-plan__header-wrapper',
			textAlign ? `has-text-align-${ textAlign }` : '',
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextAlign ) =>
						setAttributes( { textAlign: nextAlign } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Header Settings', 'mrkwp-freemius' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Title HTML Tag', 'mrkwp-freemius' ) }
						value={ titleTag }
						options={ [
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'p', value: 'p' },
						] }
						onChange={ ( val ) =>
							setAttributes( { titleTag: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName={ titleTag }
					className="mrkwp-pricing-plan__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Plan Title', 'mrkwp-freemius' ) }
				/>
				<RichText
					tagName="p"
					className="mrkwp-pricing-plan__subtitle"
					value={ subtitle }
					onChange={ ( val ) => setAttributes( { subtitle: val } ) }
					placeholder={ __( 'Plan Subtitle', 'mrkwp-freemius' ) }
				/>
			</div>
		</>
	);
}
