import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate } from '../../../lib/utilities';

function GameCard(props) {
  let date = formatDate(props.game.datetimeLocal);
  let id = props.game.id;
  let title = props.game.shortTitle;
  if(!props.game.isLocal){
    date = formatDate(props.game.datetime_local);
    title = props.game.short_title;
  }
  return (
    <div className="card" style={{width: '20rem', margin: '10px'}}>
      <div className="card-block">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">
          {id} <br />
          {date}
        </p>
        <a href="#" className="btn btn-primary" onClick={props.handleClick} data-toggle="modal" data-target="#modal">{props.buttonText}</a>
      </div>
    </div>
  );
}

export default GameCard;
