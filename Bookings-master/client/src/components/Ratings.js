import React from 'react';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStarHalf from 'react-icons/lib/fa/star-half';
import FaStarHalfEmpty from 'react-icons/lib/fa/star-half-empty';
import FaStar from 'react-icons/lib/fa/star';
import styled from 'styled-components';

 const RatingsMain = styled.div`
   height: 20px;
   width: 100px;
   display: flex;
   align-items: flex-end;
   justify-content: flex-start;
   font-family: 'Quicksand', sans-serif;

 `;
 const Stars = styled.div`
  font-size: 13px;
  color: #55b0b2;
  align-self: center;
`;
const RatingsAmount = styled.div`
  font-size: 15px;
  align-items: flex-end;
  padding-left: 3px;
  font-family: 'Quicksand', sans-serif;

`;

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsArr : []
    };
    this.calculateStars = this.calculateStars.bind(this);
  }
  componentDidMount () {
    this.calculateStars();
  }
  calculateStars () {
    var stars = this.props.stars;
    var starsArr = [];
    for(var i = 0; i < this.props.stars; i++){
      starsArr.push(<FaStar/>);
    }
    this.setState(function(){
      return {
        starsArr: starsArr
      }
    })
  }
  render (props) {

    return (
      <RatingsMain>
        <Stars>
          {this.state.starsArr.map(item => (
            item
          ))}
        </Stars>
        <RatingsAmount>{this.props.ratingAmount}</RatingsAmount>
      </RatingsMain>
    )
  }
}

export default Ratings;