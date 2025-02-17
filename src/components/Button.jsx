import React from 'react'
import '../styles/Button.css'

function Button(props) {
    const { label, name, onClick, isDisabled, isDropdown, onHover } = props;
    const handleClick = () => {
        if (!isDisabled && onClick) onClick();
    };
  return (
    <button 
        id={name} 
        className={`button ${isDisabled ? 'disabled' : ''} ${isDropdown ? 'dropbtn' : ''}`}
        onClick={handleClick}
        onMouseEnter={onHover?.in}
        onMouseLeave={onHover?.out}
    >
        {label}
    </button>
  )
}

export default Button