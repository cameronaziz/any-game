import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as sportActions from '../../../actions/sports';
import { findByKey } from '../../../lib/utilities';

import List from '../common/List';
import Modal from '../common/Modal';
import SportModalForm from './SportModalForm';

let sportObj = {
  name: '',
  slug: '',
  acronym: '',
  openingDay: ''
};

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: sportObj,
      modalTitle: 'Add a new Sport'
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.updateOpeningDate = this.updateOpeningDate.bind(this);
    this.setSport = this.setSport.bind(this);
    this.createSport = this.createSport.bind(this);
    this.removeSport = this.removeSport.bind(this);
    this.clearSport = this.clearSport.bind(this);
  }

  componentWillMount() {
    this.props.sportActions.loadSports();
  }

  updateOpeningDate(selection) {
    let date = moment(selection).format('YYYY-MM-DD');
    let sport = this.state.sport;
    sport['openingDay'] = date;
    this.setState({sport: sport});
  }

  updateFormState(event) {
    const field = event.target.name;
    let sport = this.state.sport;
    sport[field] = event.target.value;
    this.setState({sport: sport});
  }

  setSport(sportName) {
    let sport = Object.assign({}, sportObj, findByKey(this.props.sports, sportName, 'name'));
    let title = 'Edit ' + sport.name;
    this.setState({
      sport: sport,
      modalTitle: title
    });
  }

  createSport() {
    this.props.sportActions.saveSport(this.state.sport);
  }

  removeSport() {
    this.props.sportActions.removeSport(this.state.sport);
  }

  clearSport() {
    this.setState({
      sport: sportObj,
      modalTitle: 'Add a new Sport'
    });
  }

  render() {
    return (
      <div>
        <h1>Sports Admin</h1>
        <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modal" onClick={this.clearSport}>
          New Sport
        </button>
        <Modal item={this.state.sport}
               modalTitle={this.state.modalTitle}
               onChange={this.updateFormState}
               deleteButton={this.removeSport}
               saveButton={this.createSport}
               modalForm={SportModalForm}
               onODChange={this.updateOpeningDate} />
        <br />
        <List list={this.props.sports}
              setItem={this.setSport} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sports: state.sports
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sportActions: bindActionCreators(sportActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Sports);
