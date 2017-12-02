import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../lib/utilities';


function TicketPreview(props) {
  const ticket = props.ticket[0].replace(/[^0-9a-z]/gi, '');
  const collapse = 'collapseSection' + ticket;
  const collapseHref = '#' + collapse;
  const heading = 'heading' + ticket;
  return (
    <div className="card card-outline-warning">
      <div className="card-header" role="tab" id={heading}>
        <h5 className="mb-0">
          <a data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
            Section {props.ticket[1].sectionName}
            <div className="float-right">
              ${props.ticket[1].price.toFixed(2)}
            </div>
          </a>
        </h5>
      </div>
      <div id={collapse} className="collapse" role="tabpanel" aria-labelledby={heading}>
        <div className="card-block">
          <form>
            <h4>{props.ticket[1].shortTitle}</h4>
            <h6>{formatDate(props.ticket[1].datetimeLocal)}</h6>
            Row: {props.ticket[1].row}<br />
            Seat: {props.ticket[1].seat}
            <br />
            <div className="float-right">
              <button type="button"
                      className="btn btn-success"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls={collapse}
                      data-target={collapseHref}>Buy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default TicketPreview;
