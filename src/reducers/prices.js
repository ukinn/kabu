
import { GET, SAVE, RESET } from '../actions';

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
      prices = JSON.parse(localStorage.getItem('kabuka')) || prices;
      return prices;
    case SAVE:
      //form の内容を反映,ディープコピーじゃないと際レンダリングされない
      const newPrice = {...prices};
      newPrice[action.values.date] = action.values.price;
      localStorage.setItem('kabuka', JSON.stringify(newPrice));
      return newPrice;
    case RESET:
      prices = initialState;
      localStorage.setItem('kabuka', JSON.stringify(prices));
      return prices;
    default:
      return prices;
  }
}
