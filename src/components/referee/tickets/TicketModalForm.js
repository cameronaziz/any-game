import React from 'react';

function TicketModalForm(props) {
  return (
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Sport</label>
              <select name="sport"
                      className="form-control"
                      onChange={props.onChange}
                      value={props.item.sport} >
                <option value="">Select a Sport</option>
                {props.sports.map((option) => {
                  return <option key={option.name} value={option.name}>{option.name}</option>;
                })}
              </select>
            </div>
          </div>
          <br />
        </div>
      </form>
    </div>
  );
}

export default TicketModalForm;
