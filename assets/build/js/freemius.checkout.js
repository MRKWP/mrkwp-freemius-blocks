jQuery(document).ready(function($) {
    $('.mrkwp-freemius-checkout-btn').on('click', function(e){
        e.preventDefault();
        var el = $(this);
        var plugin_id = el.data('plugin-id');
        var plan_id = el.data('plan-id');
        var public_key = el.data('public-key');
        var license = el.data('license');
        var trial = el.data('trial');
        var product_name = el.data('product-name');
        var product_name_slug = product_name.toLowerCase().replace(/ /g, "-");

        if(trial == 'false') {
            trial = false;
        }

        var handler = FS.Checkout.configure({
            plugin_id:  plugin_id,
            plan_id:    plan_id,
            public_key: public_key,
            trial : trial
        });

        handler.open({
            licenses : license,
            purchaseCompleted: function( response ) {
                var event_action = 'trial';
                var event_values = 1;
                if (trial) {
                    // push ga event
                    var trialData = {
                        'EventCategory':'Free Trial',
                        'EventAction': product_name,
                        'EventLabel': license + " site",
                        'EventValue': '1'
                    };

                    dataLayer.push(trialData);
                    dataLayer.push({'event': 'gaEvent'});
                } else {
                    event_action = 'purchase';
                    event_values = response.purchase.initial_amount;
                    // push ga transaction
                    if ( typeof dataLayer !== "undefined" ) {
                        var event_data = {
                         'transactionId': (new Date()).getTime().toString(),
                         'transactionTotal': event_values,
                         'transactionTax': 0,
                         'transactionShipping': 0,
                         'transactionProducts': [
                         {
                             'sku' : license + '-' + product_name_slug,
                             'name': product_name,
                             'category': event_action,
                             'price': event_values,
                             'quantity': 1
                         }
                         ]
                     };
                     dataLayer.push(event_data);
                 }
             }

         }
     });

    });
});