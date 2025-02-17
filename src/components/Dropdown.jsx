import React from 'react'
import '../styles/Dropdown.css'
import Button from './Button';

function Dropdown(props) {
    const { 
        label = 'Dropdown',
        onClick, 
        onChange,
        options = [],
        name = 'dropdown-' + Math.random(),
        selected,
    } = props;

    const [show, setShow] = React.useState(false);

    const renderedOptions = options.map((option, index) => {
        if (!option || !option.label || !option.value) return null;
        const clickChange = () => {
            console.log('clickChange', option.value);
            if (onChange) onChange(option.value);
            setShow(false);
        };

        return (
            <a key={index} href="#" onClick={clickChange}>{option.label}</a>
        )
    });

    const handleClickButton = () => {
        setShow(!show);
        if (onClick) onClick();
    };

    const buttonLabel = options.find(option => option.value === selected)?.label || label;

  return (
    <div 
        id={name} 
        className={`dropdown ${show ? 'show' : ''}`}
    >
        <label htmlFor="theme-selector">{label}</label>
        <Button
            label={buttonLabel}
            onClick={handleClickButton}
            isDropdown={true}
        />
        <div 
            id={`${name}-content`} 
            className="dropdown-content"
        >
            {renderedOptions}
        </div>
    </div>
  )
}

export default Dropdown