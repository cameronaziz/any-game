import React from 'react';

function SectionForm(props) {
  return (
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
        <label>Zone</label>
        <select name="zone"
                className="form-control"
                onChange={props.onChange}
                value={props.section.zone} >
          <option value="">Select a Zone</option>
          {props.zones.map((option) => {
            return <option key={option.name} value={option.name}>{option.name}</option>;
          })}
        </select>
      </div>
  );
}

export default SectionForm;
