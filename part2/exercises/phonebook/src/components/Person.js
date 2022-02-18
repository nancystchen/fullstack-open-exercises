const Person = ({person, handleOnClick}) => {
  return (
    <p> 
      {person.name} {person.number} 
      <button onClick={handleOnClick}> Delete </button>
    </p> 
  )
}

export default Person
