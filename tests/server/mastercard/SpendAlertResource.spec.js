'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const mastercard_moneysend = require('mastercard-moneysend');
const spendalert = require('./../../../payments/serviceInvokers/SpendAlertsService');

var requestdata = require('./resources/requestdata_spendalerts.json');

  /**
  * describe is a key-word from
  */
  describe('spend alert', () => {
    let req;
    let res;

    beforeEach(()=> {
      req = {};
      res = {
        send: sinon.spy()
      }

  });

  describe('query alert method', () => {
      it('should respond by sending a correct response', (done) => {

      //mag niet gedupliceerd zijn...
      requestdata.AlertsRequestV1.TransactionReference =
      Math.floor(
        1000000000000000000 + Math.random() *
        900000000000000000);;

        spendalert.queryAlerts(requestdata)
        .then((data) => {
                  // Log moneysendService.createPayment data
                  console.log('spendAlerts TEST response:');
                  console.log(data);
                  done();
              })
              .catch((error) => {
                  // Log the reject error
                  console.log('spendAlerts TEST error:');
                  console.log(error);
                  done();
              });

      });
    });

    });

