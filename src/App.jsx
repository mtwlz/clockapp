import React from 'react'
import './App.css'
import Clock from './components/Clock';
import Settings from './components/Settings';

import { GlobalContext } from './contexts/globalContext';
import Button from './components/Button';

function App() {

  const { theme } = React.useContext(GlobalContext);

  const [showSettings, setShowSettings] = React.useState(false);

  // Simulate Click to start sound //
  React.useEffect(() => {
    document.getElementById("app").click();
  });

  return (
    <div id='app' className={`app ${theme}`}>
      <Clock />
      {showSettings && <Settings handleShow={setShowSettings} /> }
      <Button
        label="Settings"
        name="open-settings"
        onClick={() => setShowSettings(!showSettings)}
      />
    </div>
  )
}

export default App
