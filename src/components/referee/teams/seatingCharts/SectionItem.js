import React, {Component} from 'react';

import SectionForm from './SectionForm';

class SectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.item
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.saveSection = this.saveSection.bind(this);
  }

  updateFormState(event) {
    const field = event.target.name;
    let section = this.state.section;
    section[field] = event.target.value;
    this.setState({section: section});
  }

  saveSection(event){
    this.props.saveSection(this.state.section);
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
            <SectionForm section={this.props.item} onChange={this.updateFormState} saveButton={this.saveSection} />
          </div>
        </div>
      </div>
    );
  }
}

export default SectionItem;
