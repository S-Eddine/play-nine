import React from 'react';

const DoneFrame = (props) => {

    const resetGame = () => {
        return props.resetGame()
    };

    return (
        <div>
            <h2>{props.doneState}</h2>
            <button type="button" className="btn btn-outline-info" onClick={() => resetGame()}>Play again !</button>
        </div>
    );
}

export default DoneFrame;
