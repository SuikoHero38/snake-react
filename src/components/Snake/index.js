import React from 'react';

const snake = (props) => {
    return (
        <div>
            {
                props.dots.map((dot, i) => {
                    const style = {
                        left: `${dot[0]}%`,
                        top: `${dot[1]}%`
                    }

                    return (
                        <div className="snake_dot" key={i} style={style}>
                        </div>
                    )

                })
            }
        </div>
    )

}

export default snake;