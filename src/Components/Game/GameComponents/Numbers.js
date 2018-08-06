import React from 'react';
import './../../../Styles/numbers.css'

const Numbers = (props) => {

    const handleNumberClick = (event) => {
        const number = parseInt(event.target.dataset.name, 10);
        if(props.selectedNumbers.indexOf(number) < 0 && props.usedNumbers.indexOf(number) < 0){
            props.selecteNumber(number);
        }
    };

    const numberClassName = (number) => {
        if(props.usedNumbers.indexOf(number) >= 0){
            return 'used';
        }
        if(props.selectedNumbers.indexOf(number) >= 0){
            return 'selected';
        }
    };

    return (
        <div className="card text-center">
            <div >
                {props.arrayOfNumber.map(
                    (number, i) => <span key={i} className={numberClassName(number)} onClick={handleNumberClick} data-name={number}>{number}</span>
                )}
            </div>
        </div>
    );
};

export default Numbers;