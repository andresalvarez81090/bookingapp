import React from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar.js';
import Ratings from './components/Ratings.js';
import Guests from './components/Guests.js';
import MdClear from 'react-icons/lib/md/clear';
import BookingPrices from './components/BookingPrices.js';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

    const BookingsMain = styled.div`
      width: 396px;
      height: 329px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;
    const Exit = styled.h1`
      margin: 10px;
      height: 38px;
      width: 40px;
      font-size: 30px;
      color: #878787;
      align-self: flex-start;
      margin-left: 20px;
      text-align: center;
      &:hover {
        border-color: #e5e5e5;
        border-radius: 55%;
        border-style: solid;
      }
    `;
    const Price = styled.div`
      font-family: 'Quicksand', sans-serif;
      width: 300px;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    `;
    const Amount = styled.div`
      font-size: 1.5em;
      color: #4c4c4c;
      align-self: flex-start;
      font-weight: bolder;
      display: flex;
      align-items: center;
    `;
    const Night = styled.div`
     font-family: 'Quicksand', sans-serif;
     color: grey;
     font-size: 13px;
    `;
    const Book = styled.button`
      font-size: 1.3em;
      background-color: #ff2f51;
      color: white;
      border-radius: 5px;
      width: 300px;
      height: 50px;
      z-index: -1;
    `;
    const Fake = styled.div`
      height: 50px;
      width: 50px;
    `;
    const InvalidBook = Book.extend `
    `;
    const Line = styled.div`
      height: 20px;
      width: 300px;
      border-width: 1px;
      border-style: solid;
      border-color: #dbdbdb;
      border-right: none;
      border-left: none;
      border-bottom: none;
    `;
    const BookingOptions = styled.div`
      display: flex;
      justify-content: space-between;
      width: 300px;
    `;
    const BookMain = styled.div`
    `;
class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {"id":1,"unavailable_dates":["3/27/2018","3/7/2018","5/26/2018","3/3/2018","4/10/2018","4/23/2018","4/16/2018","4/22/2018","3/31/2018","4/2/2018","2/25/2018","5/10/2018","5/24/2018","4/8/2018","5/18/2018","3/21/2018","4/9/2018","2/25/2018","5/21/2018","5/3/2018","5/23/2018","3/13/2018","3/16/2018","4/17/2018","5/25/2018","4/9/2018","5/19/2018","4/30/2018","3/13/2018","4/1/2018","5/14/2018","4/8/2018","3/12/2018"],"rating":3,"rating_amount":81,"guest_max":4,"cost":187,"min_stay":3,"max_stay":25,"children_allowed":true},
      invalidDate: false,
      readyToBook: false,
      booked: 'Book',
      renderBook: true,
      unavailableDates: [moment('2018/3/20')]
    }
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
    this.addInvalidDates = this.addInvalidDates.bind(this);
  }
  componentDidMount () {
    this.fetchInfo();
     let id = this.props.match.params.id;
    let context = this;
    var arr = [];
    axios.get(`http://localhost:3002/api/bookings/${id}`)
      .then(function (response) {
        context.addInvalidDates(response.data[0].unavailableDates);
        context.setState(function(){
          return {
            data : response.data[0],
          }
        })
      })
      .catch(function (error) {
        console.log('error', error);
      })
    console.log('here', this.state.data.unavailableDates);
  }
  toggleBook () {
    if(this.state.renderBook === true){
      this.setState(function(){
        return {
          renderBook : false
        }
      })
    } else {
      this.setState(function(){
        return {
          renderBook : true
        }
      })
    }
  }
  fetchInfo () {
    return this.state.unavailableDates;
    // let id = this.props.match.params.id;
    // let context = this;
    // var arr = [];
    // axios.get(`http://localhost:3002/api/bookings/${id}`)
    //   .then(function (response) {
    //     context.addInvalidDates(response.data[0].unavailableDates);
    //     context.setState(function(){
    //       return {
    //         data : response.data[0],
    //       }
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log('error', error);
    //   })
    // console.log('here', this.state.data.unavailableDates);
  }
  addInvalidDates (date) {
    console.log(date[0]);
    console.log()
    var final = [];
    for(var i = 0; i < date.length; i++){

      var correct = date[i].split('/')
      var last = correct.pop();
      correct.unshift(last);
      correct = correct.join('/');
      console.log(correct);
      final.push(moment(correct));
    }
    this.setState(function(){
      return {
        unavailableDates: final
      }
    })
  }
  handleInvalidDates (option) {
    if(option === true){
      console.log('not ready to book')
      this.setState(function(){
        return {
          invalidDate: true,
          readyToBook: false,
        }
      })
    } else {
      console.log('ready to book')
      this.setState(function(){
        return {
          invalidDate: false,
          readyToBook: true,
        }
      })
    }
  }
  handleGuest (adultAmount) {
    if(adultAmount >= 1) {
      this.setState(function () {
        return {
          guestReady: true
        }
      })
    }
  }
  handleBook () {
    console.log('booked has ran');
    if(this.state.invalidDate === false && this.state.guestReady === true){
      this.setState(function() {
        return {
          booked: 'Room has been booked',
        }
      })
    }
  }
  render () {
    return (
      <BookingsMain>
        <Price>
          <Amount>
            ${this.state.data.cost}
            <Night>  per night </Night>
          </Amount>
          <Ratings ratingAmount={this.state.data.numberOfRatings} stars={this.state.data.rating}/>
        </Price>
        <Line/>
        <BookingOptions>
        <Calendar handleInvalidDates={this.handleInvalidDates} ud={this.state.unavailableDates} fetchInfo={this.fetchInfo.bind(this)}/>
        <Guests children_allowed={this.state.data.childrenAllowed} guest_max={this.state.data.guestMax} handleGuest={this.handleGuest} toggleBook={this.toggleBook}/>
        </BookingOptions>
        <Fake onClick={this.handleBook}></Fake>
        {this.state.renderBook === true
          ? <BookMain>
              {this.state.invalidDate === false ? <Book onClick={this.handleBook}> {this.state.booked}</Book> : <InvalidBook> Dates not available</InvalidBook>}
            </BookMain>
          : null
        }
      </BookingsMain>
    )
  }
}



export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact render={(props) => {
            return  <Bookings {...props} />
          }} />
          <Route path='/:bookings/:id' component={Bookings} />
        </div>
      </Router>
    );
  }
}