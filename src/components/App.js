import React, { Component } from 'react';

import { savePrice, getPrice } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
  {en: 'sun', ja: '日曜'},
  {en: 'mon_am', ja: '月曜ＰＭ'},
  {en: 'mon_pm', ja: '月曜ＡＭ'},
  {en: 'tue_am', ja: '火曜ＰＭ'},
  {en: 'tue_pm', ja: '火曜ＡＭ'},
  {en: 'wed_am', ja: '水曜ＰＭ'},
  {en: 'wed_pm', ja: '水曜ＡＭ'},
  {en: 'thu_am', ja: '木曜ＰＭ'},
  {en: 'thu_pm', ja: '木曜ＡＭ'},
  {en: 'fri_am', ja: '金曜ＰＭ'},
  {en: 'fri_pm', ja: '金曜ＡＭ'},
  {en: 'sat_am', ja: '土曜ＰＭ'},
  {en: 'sat_pm', ja: '土曜ＡＭ'},
];


class App extends Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.renderDateSelect = this.renderDateSelect.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
  }

  componentDidMount(){
    const { getPrice } = this.props;
    getPrice();
  };
  submit(values){
    const { savePrice } = this.props;
    savePrice(values);
  };
  renderDateSelect(){
    const renderOptions = ()=> {
      const options = dates.map((date)=>{
        return (<option key={date.en} value={date.en}>{date.ja}</option>);
      });
      return options;
    };
    const renderComponent = (field)=> {
      const { input } = field;
      return (
        <div>
          <InputLabel htmlFor="date-select">曜日</InputLabel>
          <Select {...input} native inputProps={{
              id: 'date-select',
            }}>
            <option aria-label="None" value="" />
            {renderOptions()}
          </Select>
        </div>
      );
    };

    return(
      <div>
        <Field name="date" component={renderComponent}>
        </Field>
      </div>
    );
  }

  renderTextField(){
    const renderComponent = (field)=> {
      const { input } = field;
      return (<TextField label="カブ価" {...input} />)
    };
    return (
      <div>
        <Field name="price" component={renderComponent} type="number" />
      </div>
    )
  }

  render(){
    const { handleSubmit, prices } = this.props;
    return(
      <div className="wrapper">
      <h1>
        あつ森カブ価記録帳
      </h1>
      <form onSubmit={handleSubmit(this.submit)}>
        <FormControl>
          {this.renderDateSelect()}
        </FormControl>
        {this.renderTextField()}
        <button type="submit">Submit</button>
      </form>
      <p>money:{prices.sun}</p>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {prices: state.prices};
};

const mapDispatchToProps = (dispatch) => ({
  getPrice: ()=> dispatch(getPrice),
  savePrice: (values)=> dispatch(savePrice(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form:'KABUKA' })(App));
