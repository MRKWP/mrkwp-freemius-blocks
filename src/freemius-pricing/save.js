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
    const { showLifeTimeFee, currency, priceTitle, productName, annualLicenseText, annualLicensePrice, lifeTimeLicenseText, lifeTimeLicensePrice, pluginID, planID, publicKey, licenseNumber, priceButtonText,  showTrialButton, trialPriceButtonText } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <section {...blockProps}>
            {/* START pricing table */}
            <div id="pricing" className="mrk-pricing-table">
                <div id="mrk-pricing-table">
                    <div className="wrapper">
                        <div className="pricing-table-item">
                            <RichText.Content
                                {...blockProps}
                                tagName="h4"
                                value={priceTitle}
                            />
                            <div className="pricing-table-item-price">
                                <span className="amount">
                                    <RichText.Content
                                    {...blockProps}
                                    tagName="sup"
                                    value={currency}
                                    />
                                        { annualLicensePrice }
                                </span>
                            </div>
                            <RichText.Content
                                {...blockProps}
                                tagName="div"
                                className="pricing-table-item-features"
                                value={annualLicenseText}
                            />
                            {
                                showLifeTimeFee && ( lifeTimeLicensePrice && (<div className="pricing-table-item-price">
                                <span className="amount">
                                    <RichText.Content
                                        {...blockProps}
                                        tagName="sup"
                                        value={currency}
                                    />
                                    {lifeTimeLicensePrice}
                                </span>
                            </div>))
                            }
                            {
                                showLifeTimeFee && ( lifeTimeLicenseText && ( <RichText.Content
                                    {...blockProps}
                                    tagName="div"
                                    className="pricing-table-item-features"
                                    value={lifeTimeLicenseText}
                                />) )
                            }
                            <div className="wp-block-kadence-advancedbtn kt-btn-align-left kt-btn-tablet-align-inherit kt-btn-mobile-align-center kt-btns-wrap">
                                <div className="kt-btn-wrap">
                                    <a className="kt-button button kt-btn-size-large kt-btn-style-basic mrkwp-freemius-checkout-btn buy-btn ugb-button" data-product-name={productName} data-plugin-id={pluginID} data-plan-id={planID} data-public-key={publicKey} data-license={licenseNumber} data-trial="false" target="blank" href="#" rel="noopener">
                                        <RichText.Content
                                            {...blockProps}
                                            tagName="span"
                                            value={priceButtonText}
                                        />
                                    </a>
                                </div>
                                { showTrialButton && (
                                    <div className="kt-btn-wrap">
                                        <a target="_self" className="kt-button button kt-btn-size-large kt-btn-style-basic mrkwp-freemius-checkout-btn trial-btn ugb-button" data-product-name={productName} data-plugin-id={pluginID} data-plan-id={planID} data-public-key={publicKey} data-license={licenseNumber} data-trial="free" href="#" rel="noopener">
                                            <RichText.Content
                                                {...blockProps}
                                                tagName="span"
                                                value={trialPriceButtonText}
                                            />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END pricing table */}
        </section>
    );
}