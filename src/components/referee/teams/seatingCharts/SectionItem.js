import React, {Component} from 'react';

import SectionForm from './SectionForm';

//todo: pass all props as props...

class SectionItem extends Component {

  constructor(props) {
    super(props);
    let sectionData = this.props.item;
    sectionData.coords = this.stringifyArea(this.props.item.area);
    this.state = {
      section: sectionData
    };
    this.stringifyArea(this.props.item.area);
    this.updateFormState = this.updateFormState.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.stringifyArea = this.stringifyArea.bind(this);
    this.arrayifyCoords = this.arrayifyCoords.bind(this);
  }

  stringifyArea(area){
    let coords = '';
    for(let i = 0; i < area.length; i++) {
      coords = coords.concat(area[i].x);
      coords = coords.concat(', ');
      coords = coords.concat(area[i].y);
      coords = coords.concat(', ');
    }
    return coords.substring(0, coords.length - 2);
  }

  arrayifyCoords(coords){
    let area = {};
    let areaSplit = coords.split(', ');
    for(let i = 0; i < areaSplit.length; i++) {
      let element = i/2;
      area[element] = [];
      area[element].x = areaSplit[i];
      i++;
      area[element].y = areaSplit[i];
    }
    return area;
  }

  updateFormState(event) {
    const field = event.target.name;
    let section = this.state.section;
    section[field] = event.target.value;
    this.setState({section: section});
  }

  saveSection(){
    let sectionData = this.state.section;
    sectionData.area = this.arrayifyCoords(sectionData.coords);
    delete sectionData.coords;
    this.props.saveSection(sectionData);
  }

  render(){
    let collapse = 'collapse' + this.props.item.name;
    let collapseHref = '#' + collapse;
    let heading = 'heading' + this.props.item.name;
    return (
      <div className="card">
        <div className="card-header" role="tab" id={heading}>
          <h5 className="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
              {this.props.item.name}
            </a>
          </h5>
        </div>
        <div id={collapse} className="collapse" role="tabpanel" aria-labelledby={heading}>
          <div className="card-block">
            <SectionForm section={this.state.section} onChange={this.updateFormState} saveButton={this.saveSection} />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionItem;
