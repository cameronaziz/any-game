import React, { Component} from 'react';
import paypal from '../../lib/paypal';

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: {}
    };
  }


  componentWillMount() {
    let create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://return.url",
          "cancel_url": "http://cancel.url"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "item",
                  "sku": "item",
                  "price": "1.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "1.00"
          },
          "description": "This is the payment description."
      }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
  }


  render() {
    return(
      <div>Hello</div>
    );
  }
}
export default Sandbox;
