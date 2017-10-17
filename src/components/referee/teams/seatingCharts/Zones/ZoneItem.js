import React, { Component } from 'react';

import ZoneForm from './ZoneForm';

class ZoneItem extends Component {
  constructor(props) {
    super(props);
    let zone = Object.assign({}, this.props.zone);
    this.state = {
      zone: zone,
      zoneName: 'Add Zone'
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.saveZone = this.saveZone.bind(this);
  }

  componentWillMount() {
    if(this.props.zone.name != '') {
      this.setState({
        zoneName: this.props.zone.name
      });
    }
  }

  updateFormState(event) {
    const field = event.target.name;
    let zone = this.state.zone;
    zone[field] = event.target.value;
    this.setState({zone: zone});
  }

  saveZone(){
    this.props.saveZone(this.state.zone);
    let zone = Object.assign({}, this.props.zone);
    this.setState({
      zone: zone
    });
  }

  render() {
    const collapse = 'collapseZone' + this.props.zone.name.replace(/\s/g,'');
    const collapseHref = '#' + collapse;
    const heading = 'heading' + this.props.zone.name.replace(/\s/g,'');
    return (
      <div className="card">
        <div className="card-header" role="tab" id={heading}>
          <h5 className="mb-0">
            <a className={this.props.labelColor} data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
              {this.state.zoneName}
            </a>
          </h5>
        </div>
        <div id={collapse} className="collapse" role="tabpanel" aria-labelledby={heading}>
          <div className="card-block">
            <ZoneForm collapseHref={collapseHref}
                      collapse={collapse}
                      onChange={this.updateFormState}
                      saveButton={this.saveZone}
                      zone={this.state.zone} />
          </div>
        </div>
      </div>
    );
  }
}

export default ZoneItem;
