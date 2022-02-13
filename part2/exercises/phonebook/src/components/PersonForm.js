import react from 'react';

const Form = ({newPerson, addNewPerson, handleNameUpdate, handleNumberUpdate}) => {
  return(
    <form onSubmit={addNewPerson}>
      <div>
        <label>
          Name:
          <input 
            value={newPerson.name} 
            onChange={handleNameUpdate} 
          />
        </label>
      </div>
      <div>
        <label>
          Number:
          <input 
            value={newPerson.number} 
            onChange={handleNumberUpdate} 
          />
        </label>
      </div>
      <div>
        <button type="submit"> Add </button>
      </div>
    </form>
  )
}

export default Form
