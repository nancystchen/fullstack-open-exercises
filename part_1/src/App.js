import React from 'react';

const App = () => {
  const name = 'Peter';
  const age = 30;
  console.log("Hello from component");
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Gregor" age={11+22}/>
      <Hello name={name} age={age}/>
    </>
  );
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} {props.age}</p>
    </div>
  );
}

export default App;
