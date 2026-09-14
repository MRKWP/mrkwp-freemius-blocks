/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	TextControl,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Fragment } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { topText } = attributes;

	return (
		<Fragment>
			<section { ...useBlockProps.save() }>
				{ /* START pricing table */ }
				<div id="pricing-copy">
					<div className="freemius">
						<RichText
							tagName="p"
							onChange={ ( topText ) =>
								setAttributes( { topText } )
							}
							value={ topText }
							placeholder={ __(
								'* All prices in $USD. These prices do not include local taxes.',
								'mrkwp-website'
							) }
						/>
						<a
							href="https://freemius.com/?badge=secure_payments&version=light"
							target="_blank"
							rel="noopener"
						>
							<img
								src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg"
								alt="Secure payments by Freemius - Sell and market freemium and premium WordPress plugins & themes"
								data-lazy-src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg"
								data-ll-status="loaded"
								className="entered lazyloaded"
							/>
							<noscript>
								&lt;img
								src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg"
								alt="Secure payments by Freemius - Sell and
								market freemium and premium WordPress plugins
								&amp; themes" /&gt;
							</noscript>
						</a>
					</div>
				</div>
				{ /* END pricing table */ }
			</section>
		</Fragment>
	);
}
