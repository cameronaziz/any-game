import React, { Component } from 'react';

import SectionForm from './SectionForm';

let sectionObj = {
  name: '',
  points: '',
  zone: '',
  startRow: '',
  endRow: '',
  startSeat: '',
  endSeat: ''
};

class SectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.section
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.clickSection = this.clickSection.bind(this);
  }

  componentWillMount(){
    //todo: fix!!1
    let sectionData = Object.assign({}, sectionObj, this.state.section[1]);
    let sectionObject = this.state.section;
    sectionObject[1] = sectionData;
    this.setState({
      section: sectionObject
    });
  }

  updateFormState(event) {
    const field = event.target.name;
    let section = this.state.section;
    section[1][field] = event.target.value;
    this.setState({section: section});
  }

  saveSection(){
    this.props.saveSection(this.state.section, this.props.index);
    let section = Object.assign({}, this.props.section);
    this.setState({
      section: section
    });
  }

  clickSection(){
    this.props.clickSection(this.props.section);
  }

  render() {
    const sectionName = this.props.section[1].name.toString();
    const collapse = 'collapseSection' + sectionName.replace(/\s/g,'');
    const collapseHref = '#' + collapse;
    const heading = 'heading' + sectionName.replace(/\s/g,'');
    return (
      <div className="card">
        <div className="card-header" role="tab" id={heading}>
          <h5 className="mb-0">
            <a className={this.props.labelColor} onClick={this.clickSection} data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
              {this.props.section.name}
            </a>
          </h5>
        </div>
        <div id={collapse} className="collapse" role="tabpanel" aria-labelledby={heading}>
          <div className="card-block">
            <form>
              <SectionForm collapse={collapse}
                           collapseHref={collapseHref}
                           onChange={this.updateFormState}
                           section={this.state.section}
                            />
              <button type="button"
                      className="btn btn-primary"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls={collapse}
                      data-target={collapseHref}
                      onClick={this.saveSection}>Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionItem;
