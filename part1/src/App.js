import React, {useState} from 'react';

const App = (props) => {
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [ allClicks, setAll ] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const resetClicks = () => {
    setAll([])
  }

  const logName = (name) => {
    return () => console.log("hello", name)
  }
  
  return (
    <>
      <Button 
        onClick={handleLeftClick}
        text="L" 
      />
      <Button 
        onClick={handleRightClick}
        text="R"
      />
      <Button
          onClick={resetClicks}
          text="Reset clicks"
     />
      <Button onClick={logName("Alek")} text="BF"/>
      <Button onClick={logName("Nancy")} text="GF"/>
      <History allClicks={allClicks} />
    </>
  );
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div> This app is used by pressing buttons</div>
    )
  } else {
    return (
      <div> History: {props.allClicks} </div>
    )
  }
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}> 
      {text}
    </button>
  )
}

export default App;
