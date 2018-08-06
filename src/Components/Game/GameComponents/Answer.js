import React from 'react';

const Answer = (props) => {

    const handleAnswerClick = (number) => {
        //const number = parseInt(event.target.dataset.name, 10);
        props.unselectNumber(number);
    }

    return (
        <div className="col-5">
            {props.selectedNumbers.map(
                    (number, i) => <span key={i} onClick={() => handleAnswerClick(number)}>{number}</span>
                )}
        </div>
    );
};

export default Answer;
