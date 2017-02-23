var paypalService = require('./paypalService.js');

var paypalPayoutData = function(value) {
    return {
        "sender_batch_header": {
            "sender_batch_id": "",
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": value,
                    "currency": "USD"
                },
                "receiver": "eduardwu-facilitator@gmail.com",
                "note": "Thank you!",
                "sender_item_id": "someStuff01"
            }
        ]
    };
}
var createNewPaypalPayment = function(value,cb){
    paypalService.paypalCreateSinglePayout(paypalPayoutData(value),function(result){
        cb(result)
    })
}

module.exports = createNewPaypalPayment