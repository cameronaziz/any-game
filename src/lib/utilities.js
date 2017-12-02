export function fullName(firstName, lastName) {
  return firstName.concat(lastName);
}

export function shortenFileName(fileName) {
  if (fileName.length > 25) {
    let start = fileName.substring(0,15);
    let end = fileName.substring(fileName.length - 13);
    return start + '...' + end;
  } else {
    return fileName;
  }
}

export function formatDate(dateString) {
  let formattedDate = new Date(dateString);
  return formattedDate.toLocaleDateString();
}

export function nextDay(dateString) {
  let date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  let nextDayString = date.toISOString();
  return nextDayString;
}

export function today(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();

  if(dd<10){
    dd='0'+dd;
  }

  if(mm<10){
    mm='0'+mm;
  }

  return mm+'/'+dd+'/'+yyyy;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function addOrRemove(array, item){
  let finalArray = [];
  if(array.indexOf(item) == -1) {
    finalArray = [ ...array, item];
  } else {
    finalArray = array.filter(char => char !== item);
  }
  return finalArray;
}

export function convertToArray(object){
  return Object.keys(object).map(function (key) { return object[key]; });
}

export function nestedObjectAssign(object) {
  let newObject = {};
  for (let key in object) {
    let nestedObject = object[key];
    let newNestedObject = Object.assign({}, nestedObject);
    newObject[key] = newNestedObject;
  }
  return newObject;
}
