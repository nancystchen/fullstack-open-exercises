import React, {useState} from 'react';

const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const name = 'Peter';
  const age = 30;
  const increment_counter = () => setCounter(counter + 1)
  const decrement_counter = () => setCounter(counter - 1)
  const reset_counter = () => setCounter(0)
  return (
    <>
      <h1>Greetings</h1>
      <Display counter={counter} />
      <Hello name="Gregor" age={11+22}/>
      <Hello name={name} age={age}/>
      <Button 
        onClick={increment_counter}
        text="increase count" 
      />
      <Button 
        onClick={decrement_counter}
        text="decrease count"
      />
      <Button 
        onClick={reset_counter} 
        text="reset count"
      />
    </>
  );
}

const Display = ({counter}) => {
  return(
    <div> {counter} </div>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}> 
      {text}
    </button>
  )
}

const Hello = ({name, age}) => {
  return (
    <div>
      <p>Hello {name} {age}</p>
    </div>
  );
}

export default App;
