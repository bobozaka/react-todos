import React from 'react';
import Todulist from './components/Todulist';
import 'rsuite/dist/rsuite.min.css';

import './App.css';

function App() {

  return (
    <div className="App">
      <h1>todos</h1>
      <Todulist />
    </div>
  );
}

export default App;
