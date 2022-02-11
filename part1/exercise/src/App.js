import react, {useState} from 'react'

const App = (props) => {
  const [good, addToGood] = useState(0)
  const [bad, addToBad] = useState(0)
  const [neutral, addToNeutral] = useState(0)

  const handleClick = (hook, val) => {
    return () => hook(val +1)
  }

  return(
    <div>
      <Header />
      <Button 
        onClick={handleClick(addToGood, good)}
        text="Good"
      /> 
      <Button 
        onClick={handleClick(addToBad, bad)}
        text="Bad" 
      /> 
      <Button 
        onClick={handleClick(addToNeutral, neutral)}
        text="Neutral" 
      /> 
      <h3> Statistics </h3> 
      <Stats 
        stats={[good,bad,neutral]}
      />
    </div>
  )
}

const Header = () => {
  return (
    <h1> UniCafe Satifaction Survey </h1>
  )
}

const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Stats = (props) => {
  const [good, bad, neutral] = props.stats
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <p> No feedback statistics to display </p>
      </>
    )
  } else {
    const all = good + neutral + bad
    const positiveRate = (100 * good/all).toFixed(2)
    const avg = (good - bad)/all
    return (
      <table>
          <StatLine text="good" value={good} />
          <StatLine text="bad" value={bad} />
          <StatLine text="neutral" value={neutral} />
          <StatLine text="all" value={all} />
          <StatLine text="average" value={avg.toFixed(2)} />
          <StatLine text="positive" value={`${positiveRate}%`} />
      </table>
    )
  }
}

const StatLine = ({text, value}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value}</td>
    </tr>
  )
}

export default App;
