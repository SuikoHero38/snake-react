import React from 'react';

const food = (props) => {
    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return (
        <div className="snake_food" style={style}>
        </div>
    )
}

export default food;