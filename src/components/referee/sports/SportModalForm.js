import React from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { formatDate } from '../common/Format';

function SportModalForm(props) {
  return(
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Sport Name</label>
              <input type="text"
                     name="name"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.name} />
            </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <label>Slug</label>
             <input type="text"
                    name="slug"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.item.slug} />
           </div>
           <div className="col-md-6">
             <label>Acronym</label>
             <input type="text"
                    name="acronym"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.item.acronym} />
           </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <label>Opening Day</label>
             <DayPickerInput style={{display : 'block'}}
                             value={props.item.openingDay}
                             inputProps={{className: 'form-control'}}
                             onDayChange={props.onODChange} />
           </div>
         </div>
        </div>
      </form>
    </div>
  );
}

export default SportModalForm;
