import React from 'react';

function AddTicketForm(props) {
  return(
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Venue Name</label>
              <input type="text"
                     name="venue"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.name} />
            </div>
          </div>
          


        </div>
      </form>
    </div>
  );
}

export default AddTicketForm;
