var ref = 1092058832510050082;
// var fundingNumber = 5184680470000023
// var amount = 678
var bodyFunc = function (ref,fundingNumber, amount) {

    return  {
             "PaymentRequestV3": {
               "LocalDate": "0817",
               "LocalTime": "150149",
               "TransactionReference": ref.toString(),
               "SenderName": {
                 "First": "Test",
                 "Middle": "T",
                 "Last": "Test"
               },
               "SenderAddress": {
                 "Line1": "123 Main Street",
                 "Line2": "5A",
                 "City": "Arlington",
                 "CountrySubdivision": "VA",
                 "PostalCode": "22207",
                 "Country": "USA"
               },
               "FundingCard": {
                 "AccountNumber": fundingNumber.toString()
               },
               "FundingSource": "03",
               "ReceivingCard": {
                 "AccountNumber": "5184680430000006"
               },
               "ReceivingAmount": {
                 "Value": amount.toString(),
                 "Currency": "840"
               },
               "ICA": "009674",
               "ProcessorId": "9000000442",
               "RoutingAndTransitNumber": "990442082",
               "CardAcceptor": {
                 "Name": "THE BEST BANK",
                 "City": "ANYTOWN",
                 "State": "MO",
                 "PostalCode": "99999-1234",
                 "Country": "USA"
               },
               "TransactionDesc": "P2P",
               "MerchantId": "123456"
             }
           };

}

'use strict';

const lostStolenService = require('./serviceInvokers/LostStolenService');
const moneysendService = require('./serviceInvokers/MoneysendService');

// Inquire if an account has been stolen
function performSecurityChecks(body) {
    /**
     * FIXME: Something is wrong when we call the API with our account number
     * From the API example 5343434343434343, '5343434343434343', 5222222222222200, and '5222222222222200' work,
     * but using the AccountNumber from the request body or hardcoding it throws a 400.
     * Maybe our AccountNumber is not known in the system/part of the sandbox.
     * error.rawErrorData.Errors.Error gives:
     * {
   *   Source: 'System',
   *   ReasonCode: 'SYSTEM_ERROR',
   *   Description: 'Unknown Error',
   *   Recoverable: 'false'
   * }
     */

    const requestData = {
        AccountInquiry: {
            AccountNumber: body.FundingRequestV3.FundingCard.AccountNumber
        }
    };

    return lostStolenService.accountInquiry(requestData);
}

// Screen the sanction
function screenSanction(body) {
    const requestData = {
        SanctionScoreServiceRequest: {
            TransactionReference: body.FundingRequestV3.TransactionReference,
            ICA: body.FundingRequestV3.ICA,
            FirstName: body.FundingRequestV3.ReceiverName.First,
            LastName: body.FundingRequestV3.ReceiverName.Last,
            Country: body.FundingRequestV3.FundingAmount.Currency
        }
    };

    return moneysendService.screenSanctions(requestData);
}

// Start the transaction
function startTransaction(body) {
    // Investigate if we still need this abstraction function
    return moneysendService.createPayment(body);
}

/**
 * Create the payment
 * @param req The request
 * @param res The response
 */
function createPayment(fundingNumber, amount, res) {
    console.log('Starting the payment process');



    const body = bodyFunc(ref, fundingNumber, amount);
    ref +=  Math.floor(
                   1000000000000000000 + Math.random() *
                   900000000000000000);


    // First resolve security and sanction checks
    Promise.all([performSecurityChecks(body), screenSanction(body)])
        .then((values) => {
        // Log lostStolenService.accountInquiry data
        console.log('lostStolenService.accountInquiry response:');
    console.log(values[0]);

    // Log moneysendService.screenSanctions data
    console.log('moneysendService.screenSanctions response:');
    console.log(values[1]);

    // Start the Mastercard transaction. This should happen only if the transaction was successfully saved in the blockchain
    startTransaction(body)
        .then((data) => {
        // Log moneysendService.createPayment data
        console.log('moneysendService.createPayment response:');
    console.log(data);

    // Send the response
    res(null, data);
})
.catch((error) => {
        // Log the reject error
        console.log('moneysendService.createPayment error:');
    console.log(error);

    // Send the response
    res(error);
});
})
.catch((error) => {
        // Log the reject error
        console.log('lostStolenService.accountInquiry or moneysendService.screenSanctions error:');
    console.log(error);

    // Send the response
    res(error);
});
}

module.exports = createPayment;