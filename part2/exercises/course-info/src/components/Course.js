import react from 'react'

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}/>
      <Content />
        {course.parts.map(part => 
          <Part key={part.id} part={part}/> 
        )}
      <Summary course={course}/>
    </>
  )
}

const Header = ({text}) => {
  return <h2>{text}</h2>
}

const Content = () => {
  return <></>
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Summary = ({course}) => {
  const sum_exercises = course.parts.reduce((acc, c) => acc + c.exercises, 0)
  return <><b>total of {sum_exercises} exercises</b></>
}

export default Course
