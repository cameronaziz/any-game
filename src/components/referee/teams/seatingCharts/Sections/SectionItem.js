import React, { Component } from 'react';

import SectionForm from './SectionForm';

class SectionItem extends Component {
  constructor(props) {
    super(props);
    let section = Object.assign({}, this.props.section);
    this.state = {
      section: section,
      sectionName: 'Add Section'
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.saveSection = this.saveSection.bind(this);
  }

  componentWillMount() {
    if(this.props.section.name.toString() != '') {
      this.setState({
        sectionName: this.props.section.name.toString()
      });
    }
  }

  updateFormState(event) {
    const field = event.target.name;
    let section = this.state.section;
    section[field] = event.target.value;
    this.setState({section: section});
  }

  saveSection(){
    this.props.saveSection(this.state.section, this.props.index);
    let section = Object.assign({}, this.props.section);
    this.setState({
      section: section
    });
  }

  render() {
    const sectionName = this.props.section.name.toString();
    const collapse = 'collapseSection' + sectionName.replace(/\s/g,'');
    const collapseHref = '#' + collapse;
    const heading = 'heading' + sectionName.replace(/\s/g,'');
    return (
      <div className="card">
        <div className="card-header" role="tab" id={heading}>
          <h5 className="mb-0">
            <a className={this.props.labelColor} data-toggle="collapse" data-parent="#accordion" href={collapseHref} aria-expanded="true" aria-controls={collapse}>
              {this.state.sectionName}
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
                           zones={Object.values(this.props.zones)} />
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
