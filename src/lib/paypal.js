//import axios from 'axios'
import config from './paypalConfig';
//import paypal from 'paypal-rest-sdk';
let paypal = require('paypal-rest-sdk');
// let options = {
//     method: 'POST',
//     url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
//     data: "grant_type=client_credentials",
//     headers: {
//         'Accept': 'application/json=',
//         'Accept-Language': 'en_US'
//     }
//   };
//
//
// https://api.sandbox.paypal.com/v1/oauth2/token \
//    -H "Accept: application/json" \
//    -H "Accept-Language: en_US" \
//    -u "client_id:secret" \
//    -d "grant_type=client_credentials"
//
//    axios.get('/user', {
//        params: {
//          ID: 12345
//        }
//      })
//      .then(function (response) {
//        console.log(response);
//      })
//      .catch(function (error) {
//        console.log(error);
//      });

paypal.configure({
  mode: 'sandbox',
  client_id: config.client_id,
  client_secret: config.client_secret});

export default paypal;
