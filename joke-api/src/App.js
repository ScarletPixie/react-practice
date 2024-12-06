import logo from './logo.svg';
import './App.css';
import JokeContent from './components/JokeContent';
import JokeFilter from './components/JokeFilter';
import { useState } from 'react';

function App() {
  const [filter, setFilter] = useState('Any');

  return (
    <>
      <JokeFilter filter={filter} setFilter={setFilter} />
      <div>
        <h1 className='title'>Today's Joke</h1>
        <JokeContent filterBy={filter} />
      </div>
    </>
  );
}

export default App;
