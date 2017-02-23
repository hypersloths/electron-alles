"use strict";
var paypal = require('paypal-rest-sdk');
require('./configure.js');

module.exports = {
    paypalCreateSinglePayout: function (paypalPayoutData, cb){
        // generate and set sender batch id
        paypalPayoutData.sender_batch_header.sender_batch_id = Math.random().toString(36).substring(9);

        // EXPECTED FORMAT OF paypalPayoutData
        // var create_payout_json = {
        //     "sender_batch_header": {
        //         "sender_batch_id": sender_batch_id,
        //         "email_subject": "You have a payment"
        //     },
        //     "items": [
        //         {
        //             "recipient_type": "EMAIL",
        //             "amount": {
        //                 "value": 0.90,
        //                 "currency": "USD"
        //             },
        //             "receiver": "eduardwu-facilitator@gmail.com",
        //             "note": "Thank you.",
        //             "sender_item_id": "item_3"
        //         }
        //     ]
        // };

        var sync_mode = 'true';

        paypal.payout.create(paypalPayoutData, sync_mode, function (error, payout) {
            var results;
            if (error) {
                console.log(error.response);
                results = error;
            } else {
                console.log("Create Single Payout Response", payout);
                results = payout;
            }
            cb( results);
        });
    },

    paypalGetPayout: function (payoutId) {
        paypal.payout.get(payoutId, function (error, payout) {
            var results;
            if (error) {
                console.log(error);
                results = error;
            } else {
                results = JSON.stringify(payout);
                console.log("Get Payout Response", results);
            }
            return results;
        });
    }

};

