import React, { Component } from 'react';

import { savePrice, getPrice } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import styled from 'styled-components';

// const kabukas = [
//   {sun: '100'},
//   {mon_am: ''},
//   {mon_pm: ''},
//   {tue_am: ''},
//   {tue_pm: ''},
//   {wed_am: ''},
//   {wed_pm: ''},
//   {thu_am: ''},
//   {thu_pm: ''},
//   {fri_am: ''},
//   {fri_pm: ''},
//   {sat_am: ''},
//   {sat_pm: ''},
// ]
//
// const kabukas2 = {
//   sun: '100',
//   mon_am: '',
//   mon_pm: '',
//   tue_am: '',
//   tue_pm: '',
//   wed_am: '',
//   wed_pm: '',
//   thu_am: '',
//   thu_pm: '',
//   fri_am: '',
//   fri_pm: '',
//   sat_am: '',
//   sat_pm: '',
// }
//
// console.log(kabukas);
// // console.log(kabukas2.sun);
// kabukas[0] = {sun: '100'};
// console.log(kabukas[0]);
// console.log(kabukas);
//

class App extends Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values){
    const { savePrice } = this.props;
    savePrice(values);
    // getPrice();
  }
  render(){
    const { handleSubmit } = this.props;
    return(
      <div className="wrapper">
      <h1>
        あつ森カブ価記録帳
      </h1>
      <form onSubmit={handleSubmit(this.submit)}>
        <Field name="sun" component="input" type="text" />
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return(
    {prices: state.prices}
  )
};

const mapDispatchToProps = (dispatch) => ({
  getPrice: ()=> dispatch(getPrice),
  savePrice: (values)=> dispatch(savePrice(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form:'KABUKA' })(App));
