
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
// let initialState = {
//   sun: '100',
//   mon_am: '1',
//   mon_pm: '11',
//   tue_am: '111',
//   tue_pm: '111',
//   wed_am: '13',
//   wed_pm: '534',
//   thu_am: '35',
//   thu_pm: '53',
//   fri_am: '346',
//   fri_pm: '364',
//   sat_am: '7',
//   sat_pm: '45',
// };

export default (prices = initialState, action) => {
  switch(action.type) {
    case GET:
      console.log('getきた')
      prices = JSON.parse(localStorage.getItem('kabuka')) || prices;
      console.log(prices);
      return prices;
    case SAVE:
      console.log(action);
      // prices = action.values;
      // console.log(prices);
      localStorage.setItem('kabuka', JSON.stringify(prices));
      return prices;
    default:
    // console.log('何にもきてない');
      return prices;
  }
}
