import React from 'react';

function VenueModalForm(props) {
  return(
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Venue Name</label>
              <input type="text"
                     name="name"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.name} />
            </div>
          </div>
        </div>
        <hr />
        <div className="form-group">
          <div className="row">
            <div className="col-md-10">
              <label>Address</label>
              <input type="text"
                     name="address"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.address} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>City</label>
              <input type="text"
                     name="city"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.city} />
            </div>
            <div className="col-md-2">
              <label>State</label>
              <input type="text"
                     name="state"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.state} />
            </div>
            <div className="col-md-2">
              <label>Zip</label>
              <input type="text"
                     name="zip"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.zip} />
            </div>
          </div>
        </div>
        <hr />
        <div className="form-group">
          <div className="row">
            <div className="col-md-3">
              <label>Slug</label>
              <input type="text"
                     name="slug"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.slug} />
            </div>
            <div className="col-md-3">
              <label>Ticket Evolution ID</label>
              <input type="text"
                     name="ticketEvolutionKey"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.ticketEvolutionKey} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VenueModalForm;
