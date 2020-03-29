
import { GET, SAVE } from '../actions';

let initialState = {
  sun: '100',
  mon_am: '',
  mon_pm: '',
  tue_am: '',
  tue_pm: '',
  wed_am: '',
  wed_pm: '',
  thu_am: '',
  thu_pm: '',
  fri_am: '',
  fri_pm: '',
  sat_am: '',
  sat_pm: '',
};

export default (prices = initialState, action) => {
  switch(action.type) {
    case GET:
      console.log('getきた')
      return prices;
    case SAVE:
      console.log(action);
      prices = action.values;
      console.log(prices);
      return prices;
    default:
    console.log('何にもきてない')
      return prices;
  }
}
