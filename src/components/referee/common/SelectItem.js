import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SelectItem(props) {
  return (
    <select type="text"
            name="zone"
            className="form-control"
            onChange={props.onChange} >
            <option value="">Select a Zone</option>
            {props.zones.map((option) => {
              if(option.name) {
                return <option key={option.name} value={option.name}>{option.name}</option>;
              } else {
                return <option key={option.name} value="no-slug">{option.name}</option>;
              }
            })}
   </select>
  );
}

export default SelectItem;
