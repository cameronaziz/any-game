import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../lib/utilities';

import accounting from 'accounting';

function TicketPreview(props) {
  const ticketKey = props.ticket._key.replace(/[^0-9a-z]/gi, '');
  const collapse = 'collapseSection' + ticketKey;
  const collapseHref = '#' + collapse;
  const heading = 'heading' + ticketKey;
  return (
    <div className="card card-outline-warning">
      <div className="card-header" role="tab" id={heading}>
        <h5 className="mb-0">
          <a data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
            Section {props.ticket.sectionName}
            <div className="float-right">
              {accounting.formatMoney(props.ticket.price)}
            </div>
          </a>
        </h5>
      </div>
      <div id={collapse} className="collapse" role="tabpanel" aria-labelledby={heading}>
        <div className="card-block">
          <form>
            <h4>{props.ticket.gameSlug}</h4>
            <h6>{formatDate(props.ticket.gameTime)}</h6>
            Row: {props.ticket.row}<br />
            Seats: {props.ticket.startSeat} - {props.ticket.endSeat}
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
