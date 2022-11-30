import React from 'react'

const Button = (props) => {
    const { style, perform } = props;

    return (
        <button 
            className={style ? `${style} btn` : 'btn'} 
            onClick={perform}>
        Start
        </button>
    )
}

export default Button