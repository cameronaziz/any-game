import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListPreview from './ListPreview';

class List extends Component {
  constructor(props) {
    super(props);
    this.previewListing = this.previewListing.bind(this);
  }

  previewListing(item, index){
    const handleClick = () => this.props.setItem(item);
    return (
      <ListPreview item={item[1]}
                   key={index}
                   handleClick={handleClick} />
    );
  }

  render() {
    return (
      <div className="col-md-4">
        <ul className="list-group">
          {Object.entries(this.props.list).map(this.previewListing)}
        </ul>
      </div>
    );
  }
}

export default List;
