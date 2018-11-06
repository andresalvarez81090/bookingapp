import React from 'react';
import styled from 'styled-components';

  const Main = styled.div`
    height: 20px;
    width: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    font-family: 'Quicksand', sans-serif;
  `;
class BookingPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsArr : []
    };
  }
  render (props) {
    return (
      <Main>

      </Main>
    )
  }
}

export default BookingPrices