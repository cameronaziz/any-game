import axios from 'axios';
import * as firebase from '../lib/firebase';

let settings = {
  "auth": {
    username: 'NzM2NDQ3OXwxNDk5NDEzNzMzLjAy',
    password: 'c646a76328b0d4a853362d659c6ff8cd54a945da16a91760116d7eecd2f8ef3e'
  }
};

function loadEvents(slug) {
  let url = "https://api.seatgeek.com/2/events?performers.slug=" + slug;
  axios.get(url, settings).then((response) => {
    let data = response.data;
    console.log(data);
  });
}

export default loadEvents;
