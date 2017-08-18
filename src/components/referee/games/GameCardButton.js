import React from 'react';
import PropTypes from 'prop-types';

function GameCardButton(props) {
  if(props.buttonProps.storedState) {
    return (
      <a href="#" className="btn btn-primary" onClick={props.buttonProps.click} data-toggle="modal" data-target="#modal">{props.buttonProps.text}</a>
    );
  } else {
    return (
      <a href="#" className="btn btn-alert">{props.buttonProps.text}</a>
    );
  }

}

export default GameCardButton;
