import react, {useState} from 'react'

// Requirements:
//   vote for each anecdote
//   each anecdote will have to have vote count
//   need to know which anecdote has the highest vote
//   need to circle around to anecdotes 
//
// Solution:
//   Display anecdote - a component
//   Holding counts - a data structure
//   Buttons - to vote or go to the next anecdote

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const App = () => {
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [curr_idx, setIdx] = useState(0)

  const handleVote = (idx) => {
    return () => {
      let updatedVotes = Object.assign([], votes)
      updatedVotes[idx] += 1
      setVotes(updatedVotes)
    }
  }

  const handleNext = () => {
    const next = (curr_idx + 1) % anecdotes.length
    setIdx(next)
  }

  const getBestAnecdote = () => {
    let max_vote = Math.max(...votes)
    if (max_vote === 0) {
      return -1
    } else {
      const idx = votes.indexOf(max_vote)
      return idx
    }
  }

  return (
    <>
      <Display idx={curr_idx} name="Anecdote of the day"/>
      <Button onClick={handleVote(curr_idx)} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
      <Display idx={getBestAnecdote()} name="Anecdote with the most votes" />
    </>
  )
}

const Display = ({idx, name}) => {
  if (idx === -1) {
    return (
      <>
        <h2>{name}</h2>
        <div> Nothing to display yet </div>
      </>
    )
  } else {
    return (
      <>
        <h2>{name}</h2>
        <div>{anecdotes[idx]}</div>
      </>
    )
  }
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text} 
    </button> 
  )
}

export default App;
