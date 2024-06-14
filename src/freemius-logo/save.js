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
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
    const { topText } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <section { ...blockProps }>
            {/* START pricing table */}
            <div id="pricing-copy">
                <div className="freemius">
                    { topText && (
                        <RichText.Content
                            {...blockProps}
                            tagName="p"
                            value={topText}
                        />
                    ) }
                    <a href="https://freemius.com/?badge=secure_payments&version=light" target="_blank" rel="noopener"><img src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg" alt="Secure payments by Freemius - Sell and market freemium and premium WordPress plugins & themes" data-lazy-src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg" data-ll-status="loaded" className="entered lazyloaded" /><noscript>&lt;img src="//img.freemius.com/badges/freemius-badge-secure-payments-light.svg" alt="Secure payments by Freemius - Sell and market freemium and premium WordPress plugins &amp; themes" /&gt;</noscript></a>
                </div>
            </div>
            {/* END pricing table */}
        </section>
    );
}