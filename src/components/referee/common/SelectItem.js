import React from 'react';
import {capitalizeFirstLetter} from '../../../lib/utilities';

function SelectItem(props) {
  const items = Object.entries(props.items);
  return (
    <select type="text"
            name={props.name}
            className="form-control"
            onChange={props.onChange} >
            <option value="">Select a {capitalizeFirstLetter(props.name)}</option>
            {items.map((option) => {
              return <option key={option[0]} value={option[0]}>{option[1].name}</option>;
            })}
    </select>
  );
}

export default SelectItem;
