import React from 'react';

function SectionForm(props) {
  return (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input type="text"
               name="name"
               className="form-control"
               onChange={props.onChange}
               value={props.section.name} />
        <label>Points</label>
        <input type="text"
               name="points"
               className="form-control"
               onChange={props.onChange}
               value={props.section.points} />
      </div>
      <button type="button" className="btn btn-primary" onClick={props.saveButton}>Save</button>
    </form>
  );
}

export default SectionForm;
