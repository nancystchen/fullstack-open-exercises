const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercise: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }
  return (
    <div className="App">
      <Header course={course}/>
      <Content 
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total 
        part1={part1}
        part2={part2}
        part3={part3}
        />
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p> {props.name}, {props.exercises}</p>
  )
}

const Content = (p) => {
  return (
    <>
      <Part name={p.part1.name} exercises={p.part1.exercises} />
      <Part name={p.part2.name} exercises={p.part2.exercises} />
      <Part name={p.part3.name} exercises={p.part3.exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.part1.exercises1 + props.part2.exercises2 + props.part3.exercises3}</p>
    </>
  )
}

export default App;
