import React from 'react';

function ZoneForm(props) {
  return (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input type="text"
               name="name"
               className="form-control"
               onChange={props.onChange}
               value={props.zone.name} />
      </div>
      <button type="button" className="btn btn-primary" onClick={props.saveButton} data-toggle="collapse" data-target={props.collapseHref} aria-expanded="false" aria-controls={props.collapse}>Save</button>
    </form>
  );
}

export default ZoneForm;
