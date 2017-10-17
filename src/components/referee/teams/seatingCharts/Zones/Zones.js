import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import ZoneList from './ZoneList';
import ZoneForm from './ZoneForm';

class Zones extends Component {
  constructor(props) {
    super(props);
    this.renderZoneList = this.renderZoneList.bind(this);
  }

  renderZoneList(){
    if(this.props.teamName){
      return (
        <div>
          <br />
          <h3>Zones</h3>
          <div className="col-md-9">
            <ZoneList saveZone={this.props.saveZone}
                      zones={this.props.zones}  />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderZoneList()}
      </div>

    );
  }
}

export default Zones;
