import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../lib/utilities';

import accounting from 'accounting';
class TicketPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.ticketKey = props.ticket._key.replace(/[^0-9a-z]/gi, '');
    this.collapse = 'collapseSection' + this.ticketKey;
    this.collapseHref = '#' + this.collapse;
    this.heading = 'heading' + this.ticketKey;
    this.buyButtonClick = this.buyButtonClick.bind(this);
    this.selectAmount = this.selectAmount.bind(this);
  }

  componentWillMount(){
    let amount = this.props.ticket.endSeat - this.props.ticket.startSeat + 1;
    if(this.props.ticket.allowSplits) {
      let options = [];
      for(let i = amount; i > 0; i--) {
        options.push(i);
      }
      if(!this.props.ticket.leaveOne) {
        options.splice(1, 1);
      }
      this.setState({
        options: options,
        selectedOption: amount
      });
    } else {
      this.setState({
        options: [amount],
        selectedOption: amount
      });
    }
  }

  buyButtonClick(event){
    this.props.buyButtonClick(event.target.name, this.state.selectedOption);
  }

  selectAmount(event){
    this.setState({
      selectedOption: event.target.value
    });
  }



  render() {
    return (
      <div className="card card-outline-warning">
        <div className="card-header" role="tab" id={this.heading}>
          <h5 className="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href={this.collapseHref} aria-expanded="true" aria-controls={this.collapse}>
              Section {this.props.ticket.sectionName}
              <div className="float-right">
                {accounting.formatMoney(this.props.ticket.price)}
              </div>
            </a>
          </h5>
        </div>
        <div id={this.collapse} className="collapse" role="tabpanel" aria-labelledby={this.heading}>
          <div className="card-block">
            <form>
              <h4>{this.props.ticket.gameSlug}</h4>
              <h6>{formatDate(this.props.ticket.gameTime)}</h6>
              Row: {this.props.ticket.row}<br />
              Seats: {this.props.ticket.startSeat} - {this.props.ticket.endSeat}
              <br />
                <div className="row">
                  <div className="col-md-5 offset-md-4">
                    Amount of Tickets
                    <select className="form-control">
                      {this.state.options.map((option) => {
                        return <option key={option} value={option}>{option}</option>;
                      })
                      }
                    </select>
                  </div>
                  <div className="col-md-1">
                    <br/>
                    <button type="button"
                            className="btn btn-success"
                            name={this.props.ticket._key}
                            onClick={this.buyButtonClick}>Buy</button>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}


export default TicketPreview;
