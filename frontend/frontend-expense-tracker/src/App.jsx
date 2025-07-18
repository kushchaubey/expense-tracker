
import { useState } from 'react';
import './App.css'

function App() {

  const [darkMode, setDarkMode] = useState('');
  function handleSwitch(){

    if(darkMode){
       setDarkMode('')

    }else{
      setDarkMode('dark')

    }
  }
 return (
  <div className={darkMode!==""?"dark":""}>
    <div className='cool'>
    <h1>Hello world from kush
    </h1>
    <button onClick={handleSwitch} >Mode Switch </button>
  </div>
  </div>
 )
}

export default App
