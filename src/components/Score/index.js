import React from 'react';

const score = (props) => {
    const style = {
        left: '35%',
        top: '50px'
    }

    return (
        <div className="snake_score" style={style}>
            <p>Total Score: {props.score} </p>
        </div>
    )
}

export default score;