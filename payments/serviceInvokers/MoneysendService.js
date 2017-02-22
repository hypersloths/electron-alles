'use strict';

/**
 * API documentation: https://developer.mastercard.com/documentation/moneysend
 */

const moneysend = require('mastercard-moneysend');
const mastercardAPIProperties = require('./../resources/mastercardAPI-properties.json');

const MasterCardAPI = moneysend.MasterCardAPI;
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
 * API documentation: https://developer.mastercard.com/documentation/moneysend/#api_payment
 * @param requestData The request data for the Payment.create API
 * @returns {Promise} The response of Payment.create
 */
function createPayment(requestData) {
    console.log('Starting Payment.create request');

    initializeAPI();

    return new Promise((resolve, reject) => {
            moneysend.Payment.create(requestData, (error, data) => {
            if (error) {
                console.error('An error occurred in the Payment.create request');
                return reject(error);
            }

            return resolve(data);
});
});
}

/**
 * API documentation: https://developer.mastercard.com/documentation/moneysend/#api_sanction_screening
 * @param requestData The request data for the SanctionScreening.read API
 * @returns {Promise}
 */
function screenSanctions(requestData) {
    console.log('Starting SanctionScreening.read request');

    initializeAPI();

    return new Promise((resolve, reject) => {
            moneysend.SanctionScreening.read(requestData, (error, data) => {
            if (error) {
                console.error('An error occurred in the SanctionScreening.read request');
                return reject(error);
            }

            return resolve(data);
});
});
}

// Methods to export
const MoneysendService = {
    createPayment,
    screenSanctions
}

module.exports = MoneysendService;