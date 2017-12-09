import React from 'react';
import {capitalizeFirstLetter} from '../../../lib/utilities';

function SelectItem(props) {
  return (
    <select type="text"
            name={props.name}
            className="form-control"
            onChange={props.onChange} >
            <option value="">Select a {capitalizeFirstLetter(props.name)}</option>
            {props.items.map((option) => {
              return <option key={option._key} value={option.name}>{option.name}</option>;
            })}
    </select>
  );
}

export default SelectItem;
