import React, { Component } from 'react';

class BulkUploadForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: ''
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChangeField(event){
    let data = event.target.value;
    this.setState({
      data: data
    });
  }

  onSubmitForm(){
    if(this.state.data) {
      this.props.bulkSaveSections(this.state.data);
    }
    this.setState({
      data: ''
    });
  }

  render(){
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Bulk Upload</label>
            <textarea type="textarea"
                   name="points"
                   className="form-control"
                   height="30"
                   onChange={this.onChangeField}
                   value={this.state.data}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onSubmitForm}>Save</button>
        </form>
      </div>
    );
  }

}

export default BulkUploadForm;
