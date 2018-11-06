import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/lib/css/_datepicker.css';
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const Main = styled.div `

`;
const Dates = styled.div`
  font-size: 12px;
  color: grey;
  font-family: 'Quicksand', sans-serif;
  margin-left: 15px;
`;
const CustomInput = styled.input`
  width: 75px;
  height: 42px;
`;
const CalendarMain = styled.div`
  height: 42px;
  width: 130px;
  display: flex;
`;
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      unavailbleDates: [],
      excludeDates: [moment().add(1, "days"), moment().add(3, "days"), moment('2018/3/20')],
      main: 'Main'
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.checkChangeEnd = this.checkChangeEnd.bind(this);
    this.populateUnavailableDates = this.populateUnavailableDates.bind(this);
    this.checkChangeStart = this.checkChangeStart.bind(this);
    this.toggleRender = this.toggleRender.bind(this);
  }
  componentDidMount () {
    this.populateUnavailableDates();
    console.log('here', this.props.ud);
    console.log(moment().add(1, "days"));
  }
  populateUnavailableDates () {
    var func = this.props.fetchInfo;
    var context = this;
    setTimeout(function() {
      var result = func();
      context.setState(function(){
        return {
          excludeDates: result
        }
      })
      console.log('should be arr', func());
    }, 2000);

    console.log('right here', this.props.ud);
  }
  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
    setTimeout(this.checkChangeStart(date), 1000);
  }
  checkChangeStart (date) {
    if(this.state.endDate){
      var endDate = this.state.endDate;
      console.log('there is an end date!');
      for(var i = 0; i < this.state.excludeDates.length; i++){
        if(this.state.excludeDates[i] > date && this.state.excludeDates[i] < endDate){
          this.props.handleInvalidDates(true);
          return;
        }
      }
      if(date > endDate){
        this.props.handleInvalidDates(true);
        return;
      }
      if(date === endDate){
        this.props.handleInvalidDates(true);
        return;
      }
      this.props.handleInvalidDates();

    } else {
      console.log('end date not selected');
    }
  }
  checkChangeEnd (date) {
    var fromDate = this.state.startDate;
    var newDate = fromDate;
     var toDate = this.state.endDate;
     var count = 0;
     var validDate = true
      for(var i = 0; i < this.state.excludeDates.length; i++){
        if(this.state.excludeDates[i] > fromDate && this.state.excludeDates[i] < date){
          this.props.handleInvalidDates(validDate);
          return;
        }
      }
      if(fromDate > date){
        this.props.handleInvalidDates(validDate);
        return;
      }
      if(fromDate === date){
        this.props.handleInvalidDates(validDate);
        return;
      }
      this.props.handleInvalidDates();
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    setTimeout(this.checkChangeEnd(date), 1000);
  }
  toggleRender () {
    if(this.state.main === 'main'){
      this.setState(function () {
        return {
          main : 'back'
        }
      })
    } else {
      this.setState(function () {
        return {
          main : 'main'
        }
      })
    }
  }
  render() {
    return (
      <Main onClick={this.toggleRender}>
        <Dates> Dates </Dates>
        <CalendarMain>
          <DatePicker
            customInput={<CustomInput />}
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            excludeDates={this.state.excludeDates}
            minDate={moment()}
            maxDate={moment().add(3, "months")}
          />
          <DatePicker
            customInput={<CustomInput />}
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            minDate={moment().add(1, "days")}
            excludeDates={this.state.excludeDates}
            maxDate={moment().add(3, "months")}
          />
        </CalendarMain>
      </Main>
  )}
}

export default Calendar;