import React from 'react';
import useSound from '../hooks/useSound';
import { useSpring, animated } from 'react-spring';

import popDown from '../sounds/ui/pop-down.mp3';
import popOn from '../sounds/ui/pop-up-on.mp3';
import popOff from '../sounds/ui/pop-up-off.mp3';

import { GlobalContext } from '../contexts/globalContext';

import '../styles/Checkbox.css';

function Checkbox({
  size = 18,
  name,
  checked,
  label,
  onChange,
  onMouseDown,
  onMouseUp,
  disabled,
}) {
  const [active, setActive] = React.useState(false);
  const { isSound } = React.useContext(GlobalContext);

  const playActive = useSound(popDown, 0.05);
  const playOn = useSound(popOn, 0.05);
  const playOff = useSound(popOff, 0.05);

  const springConfig = {
    tension: 400,
    friction: 22,
    clamp: !checked,
  };

  const filledScale = checked ? (active ? 1.4 : 1) : 0;
  const filledSpring = useSpring({
    transform: `scale(${filledScale})`,
    config: springConfig,
  });

  const outlineScale = active ? 0.8 : 1;
  const outlineSpring = useSpring({
    transform: `scale(${outlineScale})`,
    config: springConfig,
  });

  return (
    <div id={name} className={`checkbox ${disabled ? 'disabled' : ''}`}>
      <div className="visible-contents">
        <animated.div className="visible-box"
          style={{ width: size, height: size, ...outlineSpring }}
        >
          <animated.div
            className="filled"
            style={filledSpring}
          />
        </animated.div>

        <span className="text">{label}</span>
      </div>
      <input
        name={name}
        type="checkbox"
        className="input"
        onMouseDown={() => {
          if (isSound) playActive();
          setActive(true);
          if (onMouseDown) onMouseDown();
        }}
        onMouseUp={() => {
          if (isSound) {
            if (checked) playOff();
            else playOn();
          }

          setActive(false);
          if (onMouseUp) onMouseUp();
        }}
        onChange={onChange}
        onClick={onChange}
      />
    </div>
  );
};

export default Checkbox;