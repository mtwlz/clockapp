import React from 'react'
import './App.css'
import Clock from './components/Clock';
import Settings from './components/Settings';

function App() {

  // Simulate Click to start sound //
  React.useEffect(() => {
    document.getElementById("clock").click();
  });

  return (
    <>
      <Clock />
      <Settings />
    </>
  )
}

export default App
