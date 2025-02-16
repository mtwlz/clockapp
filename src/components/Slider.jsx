import React from 'react';
import '../styles/Slider.css';

function Slider(props) {
    const { 
        min = 0, 
        max = 100, 
        step = 1, 
        name = 'slider-' + Math.random(), 
        label, 
        value = 50, 
        onChange = null, 
        onMouseUp = null
    } = props;

    const [currentValue, setCurrentValue] = React.useState(value);

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
        if (onChange) onChange(e);
    };

  return (
    <div className="slidecontainer">
        <div className="slider-label">{label}</div>
        <input
            name={name}
            type="range"
            className="slider"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            onMouseUp={onMouseUp}
          />
    </div>
  )
}

export default Slider