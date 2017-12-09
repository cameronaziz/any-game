import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as venueActions from '../../../actions/venues';
import { findByKey } from '../../../lib/utilities';

import List from '../common/List';
import Modal from '../common/Modal';
import VenueModalForm from './VenueModalForm';

const venueObj = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: ''
};

class Venues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: venueObj,
      modalTitle: 'Add a new Venue'
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.setVenue = this.setVenue.bind(this);
    this.createVenue = this.createVenue.bind(this);
    this.removeVenue = this.removeVenue.bind(this);
    this.clearVenue = this.clearVenue.bind(this);
  }

  componentWillMount() {
    this.props.venueActions.loadVenues();
  }

  updateFormState(event) {
    const field = event.target.name;
    let venue = this.state.venue;
    venue[field] = event.target.value;
    this.setState({venue: venue});
  }

  setVenue(venueName) {
    let venue = Object.assign({}, venueObj, findByKey(this.props.venues, venueName, 'name'));
    let title = 'Edit ' + venue.name;
    this.clearVenue();
    this.setState({
      venue: venue,
      modalTitle: title
    });
  }

  createVenue() {
    this.props.venueActions.saveVenue(this.state.venue);
  }

  removeVenue() {
    this.props.venueActions.removeVenue(this.state.venue);
  }

  clearVenue() {
    this.setState({
      venue: venueObj,
      modalTitle: 'Add a new venue'
    });
  }

  render() {
    return (
      <div>
        <h1>Venue Admin</h1>
        <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modal" onClick={this.clearVenue}>
          New Venue
        </button>
        <Modal item={this.state.venue}
               modalTitle={this.state.modalTitle}
               onChange={this.updateFormState}
               deleteButton={this.removeVenue}
               saveButton={this.createVenue}
               modalForm={VenueModalForm} />
        <br />
        <List list={this.props.venues}
              setItem={this.setVenue} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    venues: state.venues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    venueActions: bindActionCreators(venueActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Venues);
