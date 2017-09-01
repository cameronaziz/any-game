import React from 'react';

import TeamSeatingChart from './TeamSeatingChart';

function TeamModalForm(props) {
  return (
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Name</label>
              <input name="name"
                     type="text"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.name} />
            </div>
            <div className="col-md-6">
              <label>Slug</label>
              <input name="slug"
                     type="text"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.slug} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Location</label>
              <input name="location"
                     type="text"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.location} />
            </div>
            <div className="col-md-6">
              <label>City</label>
              <input name="city"
                     type="text"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.city} />
            </div>
          </div>
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
            <div className="col-md-6">
              <label>Venue</label>
              <select name="venue"
                      className="form-control"
                      onChange={props.onChange}
                      value={props.item.venue} >
                <option value="">Select a Venue</option>
                {props.venues.map((option) => {
                  return <option key={option.name} value={option.name}>{option.name}</option>;
                })}
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <TeamSeatingChart team={props.item} uploadFile={props.uploadFile}/>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TeamModalForm;
