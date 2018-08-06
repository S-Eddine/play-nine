import React from 'react';

const Button = (props) => {

    const handleClick = () => {
        props.checkAnswer();
    };

    const handleCorrectClick = () => {
        props.acceptAnswer();
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
        <div className="col-2">
            {button}
        </div>
    );
};

export default Button;