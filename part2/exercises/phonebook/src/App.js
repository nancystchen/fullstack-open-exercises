import {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => 
        setPersons(response.data)
      )
  }

  useEffect(getPersons, [])
  
  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).find(name => name === newPerson.name)) {
      window.alert(`${newPerson.name} already exists in the phone book.`)
    } else if (newPerson.name === '') {
      window.alert("Contact name cannot be empty.")
    } else {
      setPersons(persons.concat(newPerson))
      setNewPerson({
        name: '',
        number: '',
      })
    } 
  }
  const handleFilterUpdate = (event) => {
    setFilter(event.target.value)
  }
  
  const handleNameUpdate = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }
  
  const handleNumberUpdate = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const personsToShow = () => {
      return persons
        .filter(p => 
          p.name
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
  }

  return (
    <div>
      <h2> Phonebook </h2>
        <Filter value={filter} onChange={handleFilterUpdate} />
      <h3> Add a new </h3>
        <PersonForm 
          newPerson={newPerson}
          addNewPerson={addNewPerson} 
          handleNumberUpdate={handleNumberUpdate}
          handleNameUpdate={handleNameUpdate}
        />
      <h3> Contacts </h3>
        {personsToShow().map(p => 
          <Person person={p} key={p.name} />
        )}
    </div>
  );
}

export default App;
