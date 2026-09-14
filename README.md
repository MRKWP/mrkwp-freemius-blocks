# M R K WP Freemius Blocks
A set of core blocks for Freemius users wanting to making pricing tables etc.


## Build Process
- Uses the npx wordpress create package for blocks
- PSR-4 PHP standards.
- composer install required

## Features & Blocks
- **Freemius Pricing Table (`mrkwp/freemius-pricing-table`)**: Fully responsive, nested pricing table with interactive Annual / Lifetime toggle.
  - **Pricing Plan Card (`mrkwp/freemius-pricing-plan`)**: Plan card container with "Most Popular" highlight badge and accent borders.
  - **Plan Header (`mrkwp/freemius-pricing-plan-header`)**: Plan title and subtitle.
  - **Plan Price (`mrkwp/freemius-pricing-plan-price`)**: Dual pricing for Annual and Lifetime with frequency suffixes, currency symbol, and Free plan support.
  - **Plan Features List (`mrkwp/freemius-pricing-plan-features`)**: Container for plan features.
  - **Feature Item (`mrkwp/freemius-pricing-plan-feature-item`)**: Individual feature item with SVG checkmark and key feature highlight toggle.
  - **Checkout Button (`mrkwp/freemius-pricing-plan-button`)**: Triggers the official Freemius Checkout modal with dynamic billing cycle, license counts, and optional free trial.
- **Freemius Logo (`mrkwp/freemius-logo`)**: Official secure payments badge.

## Architecture
- **PSR-4 Standards**: Fully compliant with Composer PSR-4 autoloading mapped to `./core` with automated fallback.
- **PHP Traits**: Uses `RegistersBlocksTrait` for block metadata registration and `FreemiusAssetsTrait` for SDK script management.
- **CSS Variables & Theme Inheritance**: SCSS styles inherit from WordPress theme color presets (`--wp--preset--color--*`) with robust defaults.

## Changelog

### 2.0.0
- Replaced legacy pricing block with the new `mrkwp/freemius-pricing-table` suite with modular InnerBlocks.
- Added interactive Annual / Lifetime toggle with dynamic client-side price switching.
- Added Freemius Checkout SDK integration with dynamic billing cycles and Google Analytics event tracking.
- Upgraded build scripts and PHP structure to PSR-4 with traits.

### 1.0.0
- Created initial plugin
