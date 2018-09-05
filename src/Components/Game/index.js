import React, { Component } from 'react';
import Stars from './GameComponents/Stars.js';
import Answer from './GameComponents/Answer.js';
import Button from './GameComponents/Button.js';
import Numbers from './GameComponents/Numbers.js';
import _ from 'lodash';
import DoneFrame from './GameComponents/DoneFrame.js';
import * as helpers from './../Utils/helpers';
import { connect } from 'react-redux';

class Game extends Component {
    arrayOfNumber = _.range(1,10);
    
    state = {
        selectedNumbers : [],
        numberOfStars : 1 + Math.floor(Math.random()*9),
        answerIsCorrect : null,
        usedNumbers : [],
        redraws : 5,
        doneStatus : null,
    };
    
    selectNumber = (number) => {
        const selectedNumbers = [...this.state.selectedNumbers, number];
        this.setState({selectedNumbers:selectedNumbers, answerIsCorrect:null});
    }

    unselectNumber = (number) => {
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
        console.log(this.state)
        const sum = this.getSumAnswer();
        if(sum === this.state.numberOfStars){
            this.setState({answerIsCorrect: true});
        }else {
            this.setState({answerIsCorrect: false});
        }
    }

    acceptAnswer = () => {
        // await this.props.dispatch(gameActions.acceptAnswer({
        //     usedNumbers : this.state.usedNumbers.concat(this.state.selectedNumbers),
        //     selectedNumbers: [],
        //     answerIsCorrect: null,
        //     numberOfStars : 1 + Math.floor(Math.random()*9),
        // }));
        this.setState(prevState => ({
            usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars : 1 + Math.floor(Math.random()*9),
        }), () => {
            this.updateDoneStatus();
        });
    }

    handleRefrechClick = () => {
        if(this.state.redraws === 0){
            return ;
        }
        this.setState(prevState => ({
            numberOfStars : 1 + Math.floor(Math.random()*9),
            selectedNumbers: [],
            answerIsCorrect: null,
            redraws : this.state.redraws - 1,
        }), () => {
            this.updateDoneStatus();
        });
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9){
                return {doneStatus : "Done. Nice !",}
            }
            if(prevState.redraws === 0 && !this.possibleSolution(prevState)){
                return {doneStatus : "Game Over !",}
            }
        }); 
    }

    possibleSolution = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);
        return helpers.possibleCombinationSum(possibleNumbers, numberOfStars);
    }

    resetGame = () => {
        this.setState({
            selectedNumbers : [],
            numberOfStars : 1 + Math.floor(Math.random()*9),
            answerIsCorrect : null,
            usedNumbers : [],
            redraws : 5,
            doneStatus : null,
        })
    };

    render() {
        const {numberOfStars, selectedNumbers,answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
       console.log('props', this.props);
        return (
            <div className="container">
                <br />
                <h1>Play Nine</h1>
                <hr />
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button checkAnswer={this.checkAnswer} selectedNumbers={selectedNumbers} answerIsCorrect={answerIsCorrect} acceptAnswer={this.acceptAnswer} handleRefrechClick={this.handleRefrechClick} redraws={redraws}/>
                    <Answer  selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame doneState={doneStatus} resetGame={this.resetGame} /> : <Numbers selectedNumbers={selectedNumbers} arrayOfNumber={this.arrayOfNumber} selecteNumber={this.selectNumber} usedNumbers={usedNumbers}/>
                }
                
            </div>
        );
    }
}
/*
    connect(mapStateToProps, mapDispatchToProps) return a function F
    Then => F(Game)
*/

function mapStateToProps(state) {
    console.log(state);
    return {
        game: state.game
    };
}

export default connect(mapStateToProps)(Game);
