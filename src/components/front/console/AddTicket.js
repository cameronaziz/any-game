import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddTicketForm from './AddTicketForm';

function AddTicket(props) {
  const ModalForm = props.modalForm;
  return(
    <div>
      <div className="modal fade" tabIndex="-1" id="modal" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Add Ticket</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AddTicketForm {...props} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.saveButton}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTicket;
