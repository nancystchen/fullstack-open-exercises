const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }
  return (
    <div className="App">
      <Header course={course}/>
      <Content 
        parts={course.parts}
      />
      <Total 
        parts={course.parts}
        />
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p> {props.name}, {props.exercises}</p>
  )
}

const Content = (p) => {
  const [part1, part2, part3] = p.parts
  return (
    <>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </>
  )
}

const Total = (props) => {
  const [p1, p2, p3] = props.parts
  return (
    <>
      <p> Number of exercises {p1.exercises + p2.exercises + p3.exercises} </p>
    </>
  )
}

export default App;
