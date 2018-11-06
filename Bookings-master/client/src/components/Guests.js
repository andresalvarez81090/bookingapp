import React from 'react';
import styled from 'styled-components';


const Main = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  font-family: 'Quicksand', sans-serif;
  text-align: left;
  direction: rtl
`;
const Guest = styled.div`
  font-size: 12px;
  color: grey;
`;
const SelectGuests = styled.button`
  height: 42px;
  width: 131px;
  background-color: white;
  border-color: #cccccc;
  border-radius: 2px;

`;
const GuestChoices = styled.div`
  height: 306px;
  width: 280px;
  align: right;
  margin-left:auto; margin-right:0;

  align-self: flex-end;
  float: right;
  direction: ltr
`;
const MainGuestSelection = styled.div`
  height: 306px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  z-index: 10;
  margin-top: 35px;
`;
const GuestMax = styled.div`
  height: 65px;
  width: 275px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 5px;
`;
const Choice = styled.div `
  height: 65px;
  width: 280px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DisableChoice = Choice.extend`
  color: grey;
  border-color: grey;
`;

 const UpCountMain = styled.div`
   width: 80px;
   height: 30px;
   font-size: 20px;
 `;
 const UpCount = styled.button`
  width: 40px;
  height: 40px;
  border-color: #55b0b2;
  color: #55b0b2;
  border-radius: 50%;
  font-size: 20px;
`;
const Close = styled.button `
  width: 50px;
  align-self: flex-end;
  border: none;
  color: #55b0b2;
  &: hover {
    text-decoration: underline;
  }
`;
const Test = styled.div`
width: 40px;
  height: 40px;
`;
const DisableCount = UpCount.extend`
  color: grey;
  border-color: grey;
`;

let GuestSelection = (props) => {
    return (
     <MainGuestSelection>
      <Choice> <UpCountMain> Adult</UpCountMain> <UpCount onClick={ () => (props.handleAddGuest('adult', 'subtract'))}>-</UpCount> {props.adultAmount}{props.maxHit === true ? <DisableCount> +</DisableCount> : <UpCount onClick={ () => (props.handleAddGuest('adult', 'add'))}>+</UpCount>} </Choice>
      {props.childrenAllowed === true
        ? <Choice>  <UpCountMain>Children </UpCountMain> <UpCount onClick={ () => (props.handleAddGuest('children', 'subtract'))}>-</UpCount> {props.childrenAmount}{props.maxHit === true ? <DisableCount> +</DisableCount> : <UpCount onClick={ () => (props.handleAddGuest('children', 'add'))}>+</UpCount>} </Choice>
        : <DisableChoice>  <UpCountMain>Children </UpCountMain> <UpCount>-</UpCount> {props.childrenAmount} <UpCount>+</UpCount> </DisableChoice>
      }
      {props.childrenAllowed === true
        ? <Choice>  <UpCountMain>Infants </UpCountMain> <UpCount onClick={ () => (props.handleAddGuest('infant', 'subtract'))}>-</UpCount> {props.infantAmount} {props.infantMaxHit === true ? <DisableCount>+ </DisableCount> : <UpCount onClick={ () => (props.handleAddGuest('infant', 'add'))}>+</UpCount>} </Choice>
        : <DisableChoice>  <UpCountMain>Infants </UpCountMain> <UpCount>-</UpCount> {props.infantAmount} <UpCount>+</UpCount> </DisableChoice>
      }
      <GuestMax> {props.guestMax} guests maximum. Infants don’t count toward the number of guests.</GuestMax>
      <Close onClick={props.close}> Close</Close>
     </MainGuestSelection>
    )

}

class Guests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      guestAmount: 1,
      adultAmount: 1,
      childrenAmount: 0,
      infantAmount: 0,
      showComponent: false,
      maxHit: false,
      infantMaxHit: false
    }
    this.toggleShowComponent = this.toggleShowComponent.bind(this);
    this.handleAddGuest = this.handleAddGuest.bind(this);
  }
  toggleShowComponent () {
    {this.state.showComponent === false
      ? this.setState(() => ({
        showComponent: true
      }))
      : this.setState(() => ({
        showComponent: false
      }))
    }
    this.props.handleGuest(this.state.adultAmount);
    this.props.toggleBook();
  }
  componentDidMount() {
    this.props.handleGuest(this.state.adultAmount);
  }
  handleAddGuest (guest, option) {
    let stateOption = guest + 'Amount';
    console.log(stateOption);
    let totalGuest = this.state.guestAmount + 1;
    let totalGuestMinus = this.state.guestAmount - 1;
    if(guest === 'infant'){
       if(option === 'add'){
        let newAmount = this.state[stateOption] + 1;
        if(newAmount <= 6){
          this.setState(() => ({[stateOption] : newAmount}))
        } else {
          this.setState(() => ({infantMaxHit : true}))
        }
      } else if (option === 'subtract'){
        let newAmount = this.state[stateOption] - 1;
        console.log(totalGuestMinus);
        if(newAmount >= 0){
          this.setState(() => ({[stateOption] : newAmount, infantMaxHit: false}))
        } else {
          this.setState(() => ({infantMaxHit : false}))
        }
      }

    } else {
      if(option === 'add'){
        let newAmount = this.state[stateOption] + 1;
        if(totalGuest <= this.props.guest_max){
          this.setState(() => ({[stateOption] : newAmount, maxHit : false, guestAmount: totalGuest}))
        } else {
          this.setState(() => ({maxHit : true}))
        }
      } else if (option === 'subtract'){
        let newAmount = this.state[stateOption] - 1;
        console.log(totalGuestMinus);
        if(totalGuestMinus >= 0 && newAmount >= 0){
          this.setState(() => ({[stateOption] : newAmount, maxHit : false, guestAmount: totalGuestMinus}))
        } else {
          this.setState(() => ({maxHit : false}))
        }
      }
    }

  }
  render () {


    return (
      <Main>
        <Guest> Guests </Guest>
        <SelectGuests onClick={this.toggleShowComponent}>
         {this.state.guestAmount} Guest
        </SelectGuests>
        {this.state.showComponent
          ? <GuestChoices>
              <GuestSelection
                handleAddGuest={this.handleAddGuest}
                guestMax={this.props.guest_max}
                close={this.toggleShowComponent}
                adultAmount={this.state.adultAmount}
                childrenAmount={this.state.childrenAmount}
                infantAmount={this.state.infantAmount}
                childrenAllowed={this.props.children_allowed}
                maxHit={this.state.maxHit}
                infantMaxHit={this.state.infantMaxHit}
              />
            </GuestChoices>
          : null
        }

      </Main>


    )
  }
}

export default Guests;