import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate } from '../../../lib/utilities';
import GameCardButton from './GameCardButton';

function LoadingGameCard(props) {
  return (
    <div className="card" style={{width: '20rem', margin: '10px'}}>
      <div className="card-block">
        <h4 className="card-title">{props.game.shortTitle}</h4>
        <p className="card-text">
          {props.game.id} <br />
          {formatDate(props.game.datetimeLocal)}
        </p>
        <a href="#" className="btn btn-primary" onClick={props.handleClick} data-toggle="modal" data-target="#modal">{props.buttonText}</a>
      </div>
    </div>
  );
}

export default LoadingGameCard;
