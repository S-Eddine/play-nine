import React from 'react';

const Button = (props) => {

    const handleClick = () => {
        props.checkAnswer();
    };

    const handleCorrectClick = () => {
        props.acceptAnswer();
    }

    const handleRefrechClick = () => {
        props.handleRefrechClick();
    }

    let button;

    switch(props.answerIsCorrect){
        case true:
        button = <button className="btn btn-success btn-lg" onClick={handleCorrectClick}><i className="fa fa-check"></i></button>
            break;
        case false:
        button =<button className="btn btn-danger btn-lg"><i className="fa fa-times"></i></button>
            break;
        default:
        button = 
            <button className="btn btn-primary btn-lg" onClick={handleClick} disabled={props.selectedNumbers.length === 0}>=</button>
            break;
    }
    
    return (
        <div className="col-2 text-center">
            {button}
            <br /><br/>
            <button className="btn btn-warning btn-sm" onClick={handleRefrechClick} disabled={props.redraws === 0}>
                <i className="fa fa-sync-alt"></i>{"  "+props.redraws}
            </button>
        </div>
    );
};

export default Button;