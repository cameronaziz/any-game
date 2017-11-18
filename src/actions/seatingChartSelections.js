import * as actionTypes from './actionTypes';

export function clickSection(section){
  return function(dispatch) {
    dispatch(sectionClicked(section));
  };
}


export function sectionClicked(section){
  return {
    type: actionTypes.SELECT_SECTION,
    section
  };
}
