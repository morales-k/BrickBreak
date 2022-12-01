import React from 'react'

const Button = (props) => {
    const { style, perform, text } = props;

    return (
        <button 
            className={style ? `${style} btn` : 'btn'} 
            onClick={perform}>
        {text}
        </button>
    )
}

export default Button