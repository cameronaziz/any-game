import React from 'react';

function SectionForm(props) {
  let coords = '';
  let area = props.section.area;
  for(let i = 0; i < area.length; i++) {
    coords = coords.concat(area[i].x);
    coords = coords.concat(', ');
    coords = coords.concat(area[i].y);
    coords = coords.concat(', ');
  }
  coords = coords.substring(0, coords.length - 2);
  return (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input type="text"
               name="name"
               className="form-control"
               onChange={props.onChange}
               value={props.section.name} />
        <label>Coordinates</label>
        <input type="text"
               name="coords"
               className="form-control"
               onChange={props.onChange}
               value={props.section.coords} />
      </div>
      <button type="button" className="btn btn-primary" onClick={props.saveButton}>Save</button>
    </form>
  );
}

export default SectionForm;
