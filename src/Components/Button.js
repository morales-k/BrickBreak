import React from 'react'

const Button = (props) => {
    const { id, style, perform, text } = props;

    return (
        <button 
            id={id}
            className={style ? `${style} btn` : 'btn'} 
            onClick={perform}>
        {text}
        </button>
    )
}

export default Button