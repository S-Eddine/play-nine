import React, { Component } from 'react';
import Stars from './GameComponents/Stars.js';
import Answer from './GameComponents/Answer.js';
import Button from './GameComponents/Button.js';
import Numbers from './GameComponents/Numbers.js';
import _ from 'lodash';

class Game extends Component {
    arrayOfNumber = _.range(1,10);
    
    state = {
        selectedNumbers : [],
        numberOfStars : 1 + Math.floor(Math.random()*9),
        answerIsCorrect : null,
        usedNumbers : []
    };
    
    selectNumber = (number) => {
        const selectedNumbers = [...this.state.selectedNumbers, number];
        this.setState({selectedNumbers:selectedNumbers, answerIsCorrect:null});
        console.log("selectNumber");
    }

    unselectNumber = (number) => {
        //this.state.selectedNumbers.splice(this.state.selectedNumbers.indexOf(number), 1);
        const selectedNumbers = this.state.selectedNumbers.filter(number_ => number !== number_);
        this.setState({selectedNumbers:selectedNumbers,answerIsCorrect:null});
    };

    getSumAnswer = () => {
        let sum = 0;
        this.state.selectedNumbers.forEach(element => {
            sum+=element;
        })
        return sum;
    }

    checkAnswer = () => {
        const sum = this.getSumAnswer();
        if(sum === this.state.numberOfStars){
            this.setState({answerIsCorrect: true});
        }else {
            this.setState({answerIsCorrect: false});
        }
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars : 1 + Math.floor(Math.random()*9),
        }));
    }

    render() {
        const {numberOfStars, selectedNumbers,answerIsCorrect, usedNumbers } = this.state;
        return (
            <div className="container">
                Play Nine
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button checkAnswer={this.checkAnswer} selectedNumbers={selectedNumbers} answerIsCorrect={answerIsCorrect} acceptAnswer={this.acceptAnswer}/>
                    <Answer  selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers} arrayOfNumber={this.arrayOfNumber} selecteNumber={this.selectNumber} usedNumbers={usedNumbers}/>
            </div>
        );
    }
}

export default Game;
