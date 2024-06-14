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
import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor';
import {
    TextControl,
    PanelBody,
    PanelRow,
    ToggleControl,
} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Fragment } from "react";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { 
        showLifeTimeFee,
        priceTitle,
        currency,
        productName,
        annualLicenseText,
        annualLicensePrice,
        lifeTimeLicenseText,
        lifeTimeLicensePrice,
        pluginID,
        planID,
        publicKey,
        licenseNumber,
        priceButtonText,
        showTrialButton,
        trialPriceButtonText
    } = attributes;

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={__('Freemius Pricing Settings', 'mrkwp-website')}
                    initialOpen={true}
                >
                    <PanelRow>
                        <fieldset>
                            <ToggleControl
                                label={__('Show Lifetime License Fee', 'mrkwp-website')}
                                checked={showLifeTimeFee}
                                onChange={ () => setAttributes( { showLifeTimeFee: !showLifeTimeFee } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('Plugin ID', 'mrkwp-website')}
                                value={pluginID}
                                onChange={ ( pluginID ) => setAttributes( { pluginID } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('Plan ID', 'mrkwp-website')}
                                value={planID}
                                onChange={ ( planID ) => setAttributes( { planID } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('Public Key', 'mrkwp-website')}
                                value={publicKey}
                                onChange={ ( publicKey ) => setAttributes( { publicKey } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('License Number', 'mrkwp-website')}
                                value={licenseNumber}
                                onChange={ ( licenseNumber ) => setAttributes( { licenseNumber } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('Product Name', 'mrkwp-website')}
                                value={productName}
                                onChange={ ( productName ) => setAttributes({ productName })}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>

                    <PanelRow>
                        <fieldset>
                            <ToggleControl
                                label={__('Show Trial Button', 'mrkwp-website')}
                                checked={showTrialButton}
                                onChange={ () => setAttributes( { showTrialButton: !showTrialButton } )}
                                type="text"
                            />
                        </fieldset>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <section {...useBlockProps.save()}>
                {/* START pricing table */}
                <div id="pricing" className="mrk-pricing-table">
                    <div id="mrk-pricing-table">
                        <div className="wrapper">
                            <div className="pricing-table-item">
                                <RichText
                                    tagName="h4"
                                    onChange={ ( priceTitle ) => setAttributes({ priceTitle })}
                                    value={priceTitle}
                                    placeholder={__('Single Site', 'mrkwp-website')}
                                    allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                />
                                <div className="pricing-table-item-price">
                                    <span className="amount">
                                        <RichText
                                            tagName="sup"
                                            onChange={ ( currency ) => setAttributes({ currency })}
                                            value={currency}
                                            placeholder={__('$', 'mrkwp-website')}
                                        />
                                        <RichText
                                            tagName="span"
                                            onChange={ ( annualLicensePrice ) => setAttributes({ annualLicensePrice })}
                                            value={annualLicensePrice}
                                            placeholder={__('9.99', 'mrkwp-website')}
                                        />
                                    </span>
                                </div>
                                <RichText
                                    tagName="div"
                                    className="pricing-table-item-features"
                                    onChange={ ( annualLicenseText ) => setAttributes({ annualLicenseText })}
                                    value={annualLicenseText}
                                    placeholder={__('Annual License', 'mrkwp-website')}
                                />
                                {
                                    showLifeTimeFee && (
                                        <div className="pricing-table-item-price">
                                            <span className="amount">
                                                <RichText
                                                    tagName="sup"
                                                    onChange={ ( currency ) => setAttributes({ currency })}
                                                    value={currency}
                                                    placeholder={__('$', 'mrkwp-website')}
                                                />
                                                <RichText
                                                    tagName="span"
                                                    onChange={ ( lifeTimeLicensePrice ) => setAttributes({ lifeTimeLicensePrice })}
                                                    value={lifeTimeLicensePrice}
                                                    placeholder={__('29.99', 'mrkwp-website')}
                                                />
                                            </span>
                                        </div>
                                    )
                                }
                                {
                                    showLifeTimeFee && (
                                        <RichText
                                            tagName="div"
                                            className="pricing-table-item-features"
                                            onChange={ ( lifeTimeLicenseText ) => setAttributes({ lifeTimeLicenseText })}
                                            value={ lifeTimeLicenseText }
                                            placeholder={__('Lifetime License', 'mrkwp-website')}
                                        />
                                    )
                                }

                                <div className="wp-block-kadence-advancedbtn kt-btn-align-left kt-btn-tablet-align-inherit kt-btn-mobile-align-center kt-btns-wrap">
                                        <div className="kt-btn-wrap">
                                            <a className="kt-button button kt-btn-size-large kt-btn-style-basic mrkwp-freemius-checkout-btn buy-btn ugb-button" data-product-name={productName} data-plugin-id={pluginID} data-plan-id={planID} data-public-key={publicKey} data-license={licenseNumber} data-trial="false" target="_blank" href="javascript:void(0);" rel="noopener">
                                                <RichText
                                                    tagName="span"
                                                    onChange={ ( priceButtonText ) => setAttributes({ priceButtonText })}
                                                    value={priceButtonText}
                                                    placeholder={__('Buy Now', 'mrkwp-website')}
                                                    className="kt-btn-inner-text"
                                                />
                                            </a>
                                        </div>
                                        { showTrialButton && (
                                            <div className="kt-btn-wrap">
                                                <a target="_self" className="kt-button button kt-btn-size-large kt-btn-style-basic  mrkwp-freemius-checkout-btn trial-btn ugb-button" data-product-name={productName} data-plugin-id={pluginID} data-plan-id={planID} data-public-key={publicKey} data-license={licenseNumber} data-trial="free" href="javascript:void(0);" rel="noopener">
                                                    <RichText
                                                        tagName="span"
                                                        onChange={ ( trialPriceButtonText ) => setAttributes({ trialPriceButtonText })}
                                                        value={trialPriceButtonText}
                                                        placeholder={__('Free Trial', 'mrkwp-website')}
                                                        className="kt-btn-inner-text"
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
        </Fragment>
    );
}