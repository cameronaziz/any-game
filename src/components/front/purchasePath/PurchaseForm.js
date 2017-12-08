import React from 'react';

function PurchaseForm(props) {
  return(
    <div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Email</label>
          <input className="form-control"
                 name="email"
                 onChange={props.onChange}
                 value={props.user.email} />
        </div>
        <div className="col-md-6">
          <label>Phone</label>
          <input className="form-control"
                 name="phone"
                 onChange={props.onChange}
                 value={props.user.phone} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <label>Credit Card</label>
          <input type="text"
                 name="creditCard"
                 className="form-control"
                 onChange={props.onChange}
                 value={props.user.creditCard} />
        </div>
        <div className="col-md-2">
          <label>CCV</label>
          <input type="text"
                 name="ccv"
                 className="form-control"
                 onChange={props.onChange}
                 value={props.user.ccv} />
        </div>
        <div className="col-md-4">
          <label>Expiration</label>
          <div className="row">
            <div className="col-md-5">
              <input type="text"
                     name="expireMonth"
                     className="form-control"
                     placeholder="MM"
                     onChange={props.onChange}
                     value={props.user.expireMonth} />
            </div>

            <div className="col-md-5">
              <input type="text"
                     name="expireYear"
                     placeholder="YY"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.user.expireYear} />
            </div>
          </div>


        </div>
      </div>
      <br />
    </div>
  );
}

export default PurchaseForm;
