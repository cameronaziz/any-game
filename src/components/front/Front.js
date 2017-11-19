import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import FrontHeader from './FrontHeader';
import FrontFooter from './FrontFooter';
import FrontRouter from '../../routers/FrontRouter';
import NoDataConnection from './NoDataConnection';

class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false
    };
    this.renderRouter = this.renderRouter.bind(this);
  }

  renderRouter(){
    if(!this.props.loading.teams) {
      if(Object.keys(this.props.teams).length > 0) {
        return(<FrontRouter teams={this.props.teams} />);
      }
      if(Object.keys(this.props.teams).length == 0) {
        return(<NoDataConnection />);
      }
    }
  }

  render() {
    return (
      <div>
        <FrontHeader />
        {this.renderRouter()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Front);
