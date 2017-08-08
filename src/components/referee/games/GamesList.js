import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameCard from './GameCard';

import { formatDate } from '../../../lib/utilities';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.previewListing = this.previewListing.bind(this);
    this.title = this.title.bind(this);
  }

  previewListing(item, index){
    const handleClick = () => this.props.setItem(item);
    return (
      <GameCard key={index}
                game={item}
                handleClick={handleClick}
                buttonText={this.props.buttonText}
                isLocal={this.props.isLocal}/>
    );
  }

  title(){
    if(this.props.isLocal) {
      return <h4>{this.props.list.length} games found</h4>;
    } else {
      return <h4>Upcoming {this.props.list.length} games</h4>;
    }
  }


  render() {
    return (
      <div className="col-md-12">
        {this.title()}
        <div className="row">
          {this.props.list.map(this.previewListing)}
        </div>
      </div>
    );
  }
}

GameList.propTypes = {
  list: PropTypes.array.isRequired
  //setItem: PropTypes.func.isRequired
};

GameList.defaultProps = {
  buttonText: 'Open'
};

export default GameList;
