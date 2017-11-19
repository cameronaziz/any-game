import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SelectTeam(props) {
  return (
    <select name="team"
            className="form-control"
            onChange={props.getData} >
      <option value="all">Pick Team</option>
      {props.teams.map((option) => {
        if(option.slug) {
          return <option key={option.name} value={option.slug}>{option.name}</option>;
        } else {
          return <option key={option.name} value="no-slug">{option.name}</option>;
        }
      })}
    </select>
  );
}

export default SelectTeam;
