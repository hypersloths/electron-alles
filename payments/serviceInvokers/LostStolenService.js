'use strict';

/**
 * API documentation: https://developer.mastercard.com/documentation/lost-and-stolen-account-list
 */
const lostStolen = require('mastercard-lost-stolen');
const mastercardAPIProperties = require('./../resources/mastercardAPI-properties.json');

const MasterCardAPI = lostStolen.MasterCardAPI;
const consumerKey = mastercardAPIProperties.consumerKey; // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
const keyStorePath = mastercardAPIProperties.keystorePath; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
const keyAlias = mastercardAPIProperties.keyAlias; // For production: change this to the key alias you chose when you created your production key
const keyPassword = mastercardAPIProperties.keyPassword; // For production: change this to the key alias you chose when you created your production key

// You only need to do initialize MasterCardAPI once
// For production use pass sandbox: false
function getAuthentication() {
    return new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
}

function initializeAPI() {
    MasterCardAPI.init({
        sandbox: true,
        authentication: getAuthentication()
    });
}

/**
 * API documentation: https://developer.mastercard.com/documentation/lost-and-stolen-account-list/#api_account_inquiry
 * @param requestData The request data for AccountInquiry.update
 * @returns {Promise} The response AccountInquiry.update
 */
function accountInquiry(requestData) {
    console.log('Starting AccountInquiry.update request');

    initializeAPI();

    return new Promise((resolve, reject) => {
            lostStolen.AccountInquiry.update(requestData, (error, data) => {
            if (error) {
                console.error('An error occurred in the AccountInquiry.update request');
                return reject(error);
            }

            return resolve(data);
});
});
}

// Methods to export
const LostStolenService = {
    accountInquiry
}

module.exports = LostStolenService;