import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import ZoneItem from './ZoneItem';

const zoneObj = {
  name: ''
};

class ZoneList extends Component {
  constructor(props) {
    super(props);
    this.previewZone = this.previewZone.bind(this);
    this.zoneListMap = this.zoneListMap.bind(this);
  }

  previewZone(item, index){
    return (
      <div key={item.name}>
        <ZoneItem saveZone={this.props.saveZone}
                  zone={item} />
      </div>
    );
  }

  zoneListMap() {
    if(this.props.zones) {
      let zones = Object.values(this.props.zones);
      return (
        zones.map(this.previewZone)
      );
    }
  }

  render() {
    return (
      <div id="accordion" role="tablist" aria-multiselectable="true">
        <div key="newZone">
          <ZoneItem saveZone={this.props.saveZone}
                    zone={zoneObj}
                    labelColor="text-success" />
        </div>
        {this.zoneListMap()}
      </div>
    );
  }
}


export default ZoneList;
