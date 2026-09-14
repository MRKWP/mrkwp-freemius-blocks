/**
 * Freemius Checkout and Billing Cycle Toggle handler.
 *
 * Handles client-side switching between Annual and Lifetime pricing,
 * and launches the Freemius Checkout modal with proper plan and billing cycle attributes.
 */
(function() {
  'use strict';

  function initFreemiusPricing() {
    // 1. Setup Billing Cycle Toggles
    var toggles = document.querySelectorAll('.mrkwp-pricing-toggle');
    toggles.forEach(function(toggle) {
      // Prevent double initialization
      if (toggle.getAttribute('data-initialized') === 'true') return;
      toggle.setAttribute('data-initialized', 'true');

      var table = toggle.closest('.mrkwp-pricing-table-container');
      if (!table) return;

      var buttons = toggle.querySelectorAll('.mrkwp-pricing-toggle__btn');
      buttons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var cycle = btn.getAttribute('data-cycle'); // 'annual' or 'lifetime'
          if (!cycle) return;

          // Update toggle active states
          buttons.forEach(function(b) {
            b.classList.remove('is-active');
          });
          btn.classList.add('is-active');

          // Switch pricing displays across all cards in this table
          var priceBlocks = table.querySelectorAll('.mrkwp-pricing-plan-price');
          priceBlocks.forEach(function(priceBlock) {
            var annualWrap = priceBlock.querySelector('.mrkwp-price--annual');
            var lifetimeWrap = priceBlock.querySelector('.mrkwp-price--lifetime');
            if (annualWrap && lifetimeWrap) {
              if (cycle === 'lifetime') {
                annualWrap.style.display = 'none';
                annualWrap.classList.remove('is-active');
                lifetimeWrap.style.display = 'inline-flex';
                lifetimeWrap.classList.add('is-active');
              } else {
                lifetimeWrap.style.display = 'none';
                lifetimeWrap.classList.remove('is-active');
                annualWrap.style.display = 'inline-flex';
                annualWrap.classList.add('is-active');
              }
            }
          });

          // Update billing cycle data attribute on all checkout buttons in this table
          var checkoutButtons = table.querySelectorAll('.mrkwp-freemius-checkout-btn');
          checkoutButtons.forEach(function(checkoutBtn) {
            checkoutBtn.setAttribute('data-billing-cycle', cycle);
          });
        });
      });
    });

    // 2. Setup Checkout Button Click Listeners (Delegated)
    document.removeEventListener('click', handleCheckoutClick);
    document.addEventListener('click', handleCheckoutClick);
  }

  function handleCheckoutClick(e) {
    var btn = e.target.closest('.mrkwp-freemius-checkout-btn');
    if (!btn) return;
    e.preventDefault();

    var plugin_id = btn.getAttribute('data-plugin-id');
    var plan_id = btn.getAttribute('data-plan-id');
    var public_key = btn.getAttribute('data-public-key');
    var license = btn.getAttribute('data-license') || '1';
    var trial = btn.getAttribute('data-trial');
    var billing_cycle = btn.getAttribute('data-billing-cycle') || 'annual';
    var product_name = btn.getAttribute('data-product-name') || '';
    var product_name_slug = product_name.toLowerCase().replace(/ /g, '-');

    if (trial === 'false') {
      trial = false;
    } else if (trial === 'true' || trial === 'free') {
      trial = true;
    }

    if (!plugin_id || !public_key) {
      console.warn('[Freemius Pricing] Plugin ID or Public Key is missing from the checkout button.');
      return;
    }

    if (typeof FS === 'undefined' || !FS.Checkout) {
      console.error('[Freemius Pricing] Freemius Checkout SDK (FS.Checkout) is not loaded.');
      return;
    }

    var handler = FS.Checkout.configure({
      plugin_id: plugin_id,
      plan_id: plan_id,
      public_key: public_key,
      trial: trial,
    });

    handler.open({
      licenses: license,
      billing_cycle: billing_cycle,
      purchaseCompleted: function(response) {
        var event_action = trial ? 'trial' : 'purchase';
        var event_values = response && response.purchase ? response.purchase.initial_amount : 1;

        if (trial) {
          // Push Google Analytics Free Trial event
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              event: 'gaEvent',
              EventCategory: 'Free Trial',
              EventAction: product_name,
              EventLabel: license + ' site',
              EventValue: '1',
              billing_cycle: billing_cycle,
            });
          }
        } else {
          // Push Google Analytics purchase transaction
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              event: 'gaEvent',
              transactionId: new Date().getTime().toString(),
              transactionTotal: event_values,
              transactionTax: 0,
              transactionShipping: 0,
              billing_cycle: billing_cycle,
              transactionProducts: [
                {
                  sku: license + '-' + product_name_slug + '-' + billing_cycle,
                  name: product_name,
                  category: event_action,
                  price: event_values,
                  quantity: 1,
                },
              ],
            });
          }
        }
      },
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFreemiusPricing);
  } else {
    initFreemiusPricing();
  }
})();