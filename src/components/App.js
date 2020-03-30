import React, { Component } from 'react';

import { savePrice, getPrice, resetPrice } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { styled as uiStyled } from '@material-ui/core/styles';

const MyPaper = uiStyled(Paper)({
  margin: '10px',
  padding: '20px'
})
const MyTableContainer = uiStyled(TableContainer)({
  margin: '10px',
  padding:'10px',
});
const ResetButton = uiStyled(Button)({
  margin:'0 auto',
  display: 'block',
});

const MyHeader = styled.h1`
  text-align: center;
  color: white;
`;


const dates = [
  {en: 'sun', ja: '日曜(買値)'},
  {en: 'mon_am', ja: '月曜ＡＭ'},
  {en: 'mon_pm', ja: '月曜ＰＭ'},
  {en: 'tue_am', ja: '火曜ＡＭ'},
  {en: 'tue_pm', ja: '火曜ＰＭ'},
  {en: 'wed_am', ja: '水曜ＡＭ'},
  {en: 'wed_pm', ja: '水曜ＰＭ'},
  {en: 'thu_am', ja: '木曜ＡＭ'},
  {en: 'thu_pm', ja: '木曜ＰＭ'},
  {en: 'fri_am', ja: '金曜ＡＭ'},
  {en: 'fri_pm', ja: '金曜ＰＭ'},
  {en: 'sat_am', ja: '土曜ＡＭ'},
  {en: 'sat_pm', ja: '土曜ＰＭ'},
];


class App extends Component {
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.renderDateSelect = this.renderDateSelect.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  //localStorageのデータを取得
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
          <InputLabel htmlFor="date-select">日時</InputLabel>
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
        <Field name="date" component={renderComponent}></Field>
      </div>
    );
  }
  renderTextField(){
    const renderComponent = (field)=> {
      const { input } = field;
      return (<TextField label="カブ価(ベル)" {...input} />)
    };
    return (
        <div>
          <Field name="price" component={renderComponent} type="number" />
        </div>
    )
  }
  renderTable(){
    const { prices } = this.props;
    const renderTableCells = ()=> {
      const tableCells = dates.map((date,index)=>{
        return(
          <TableRow key={date.en}>
            <TableCell>{date.ja}</TableCell>
            <TableCell>{prices[date.en]}</TableCell>
          </TableRow>
        )
      })
      return tableCells;
    }
    return(
      <MyTableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>日時</TableCell>
              <TableCell>カブ価(ベル)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableCells()}
          </TableBody>
        </Table>
      </MyTableContainer>
    );
  }
  handleReset(){
    const { resetPrice } = this.props;
    resetPrice();
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <Container maxWidth="xs">
        <MyHeader>
          あつ森カブ価記録帳
        </MyHeader>
        <form onSubmit={handleSubmit(this.submit)}>
          <MyPaper>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl>
                  {this.renderDateSelect()}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                {this.renderTextField()}
              </Grid>
              <Grid item xs={12}>
                <div><Button variant="contained" color="primary" fullWidth type="submit">記録する</Button></div>
              </Grid>
            </Grid>
          </MyPaper>
        </form>
        {this.renderTable()}
        <ResetButton onClick={this.handleReset} variant="contained" color="secondary">リセット</ResetButton>
      </Container>
    );
  };
}

const mapStateToProps = (state) => {
  return {prices: state.prices};
};

const mapDispatchToProps = (dispatch) => ({
  getPrice: ()=> dispatch(getPrice),
  savePrice: (values)=> dispatch(savePrice(values)),
  resetPrice: ()=> dispatch(resetPrice),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form:'KABUKA' })(App));
