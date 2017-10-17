import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SelectFilter(props) {
  return (
    <select name={props.name}
            className="form-control"
            onChange={props.getData} >
      <option value="all">Pick Team</option>
      {props.items.map((option) => {
        if(option.slug) {
          return <option key={option.name} value={option.slug}>{option.name}</option>;
        } else {
          return <option key={option.name} value="no-slug">{option.name}</option>;
        }
      })}
    </select>
  );
}

export default SelectFilter;
