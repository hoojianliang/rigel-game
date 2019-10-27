import React from 'react';
import './App.css';
import Game from "./Game/GameBox";

const boxes = [{stage : 1, box : [{ color: 'white' }, { color: 'red' }]}];
function App() {
  return (
    <div className="game">
      <Game boxes={boxes} />
    </div>
  );
}

export default App;
