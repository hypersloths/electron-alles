var paypal = require('paypal-rest-sdk');
var secret = require('./secret.json')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': secret.client_id,
    'client_secret': secret.client_secret,
    'headers' : {
        'custom': 'header'
    }
});