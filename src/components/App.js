import React, { Component } from 'react';

import { savePrice, getPrice } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

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
const dates = [
  {en: '日曜日',ja: '日'},
  {en: 'mon_am', ja: '月ＰＭ'},
  {en: 'mon_pm', ja: '月ＡＭ'},
  {en: 'tue_am', ja: '火ＰＭ'},
  {en: 'tue_pm', ja: '火ＡＭ'},
  {en: 'wed_am', ja: '水ＰＭ'},
  {en: 'wed_pm', ja: '水ＡＭ'},
  {en: 'thu_am', ja: '木ＰＭ'},
  {en: 'thu_pm', ja: '木ＡＭ'},
  {en: 'fri_am', ja: '金ＰＭ'},
  {en: 'fri_pm', ja: '金ＡＭ'},
  {en: 'sat_am', ja: '土ＰＭ'},
  {en: 'sat_pm', ja: '土ＡＭ'},
];


class App extends Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.renderFields = this.renderFields.bind(this);
  }
  submit(values){
    const { savePrice } = this.props;
    savePrice(values);
    // getPrice();
  }
  componentDidMount(){
    const { getPrice } = this.props;
    getPrice();
  }
  renderFields(){
    const fields = dates.map((date,indexs)=>{
      const renderComponents = (field)=> {
        //redux-form の設定を取得
        const { input } = field;
        return(
          <TextField fullWidth label={date.ja} {...input} />
        )};
      return (
      <Field key={date.en} name={date.en} label={date.ja} component={renderComponents} type="number" />
    )}
  );
    return fields;
  }

  render(){
    const { handleSubmit, prices } = this.props;
    return(
      <div className="wrapper">
      <h1>
        あつ森カブ価記録帳
      </h1>
      <form onSubmit={handleSubmit(this.submit)}>
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
      <p>money:{prices.sun}</p>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return(
    {
      prices: state.prices,
      initialValues: state.prices,
    }
  )
};

const mapDispatchToProps = (dispatch) => ({
  getPrice: ()=> dispatch(getPrice),
  savePrice: (values)=> dispatch(savePrice(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form:'KABUKA' })(App));
