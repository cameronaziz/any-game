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
        <div className="row">
          <div className="col-md-6">
            <label>Start Row</label>
            <input type="text"
                   name="startRow"
                   className="form-control"
                   onChange={props.onChange}
                   value={props.section.startRow} />
          </div>
          <div className="col-md-6">
            <label>End Row</label>
            <input type="text"
                   name="endRow"
                   className="form-control"
                   onChange={props.onChange}
                   value={props.section.endRow} />
         </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Start Seat</label>
            <input type="text"
                   name="startSeat"
                   className="form-control"
                   onChange={props.onChange}
                   value={props.section.startSeat} />
          </div>
          <div className="col-md-6">
            <label>End Seat</label>
            <input type="text"
                   name="endSeat"
                   className="form-control"
                   onChange={props.onChange}
                   value={props.section.endSeat} />
         </div>
        </div>
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
