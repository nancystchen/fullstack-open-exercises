import {useState, useEffect} from 'react';

import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

import personsService from './services/persons';

const defaultPerson = {
  name: '',
  number: '',
  id: ''
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newPerson, setNewPerson] = useState(defaultPerson)
  const [existingContact, setExistingContact] = useState(false)
  const [message, setMessage] = useState(null)

  const getPersons = () => {
    personsService
      .get()
      .then(persons => 
        setPersons(persons)
      )
  }

  const deletePerson = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        const id = person.id
        personsService
          .del(id)
          .then(response =>
            setPersons(
              persons.filter(p => p.id !== id)
            )
          )
          .catch(err => {
            notify(`Information of ${person.name} has already been removed from server.`)
          })
      }
    }
  }

  useEffect(getPersons, [])

  const notify = (msg) => {
    console.log(msg)
    setMessage(msg)
    setTimeout(() => {setMessage(null)}, 5000)
  }
  
  const addNewPerson = (event) => {
    event.preventDefault()
    if (existingContact) {
      if (window.confirm(`Replace ${newPerson.name}'s contacts?`)) {
        personsService
          .put(newPerson.id, newPerson)
          .then(person => {
            setPersons(persons
              .map(p => 
                p.name === person.name
                ? person
                : p
              ))
            notify(`Updated ${person.name}`)
          })
          .catch(err => {
            console.log(err)
            notify(`Information of ${newPerson.name} has already been removed from server.`)
          })
        setNewPerson(defaultPerson)
        setExistingContact(false)
      }
    } else if (newPerson.name === '') {
      window.alert("Contact name cannot be empty.")
    } else {
      personsService
        .post(newPerson) 
        .then(data => {
          setPersons(persons.concat(newPerson))
          setNewPerson(defaultPerson)
          notify(`Added ${newPerson.name}`)
        })
      setExistingContact(false)
    } 
  }

  const handleFilterUpdate = (event) => {
    setFilter(event.target.value)
  }
  
  const handleNameUpdate = (event) => {
    const name = event.target.value
    const existingPerson = persons.find(p => p.name === name) 
    if (existingPerson) {
      setNewPerson({
        ...newPerson,
        name: name,
        id: existingPerson.id,
      })
      setExistingContact(true)
    } else {
      const maxId = Math.max(...persons.map(p => p.id))
      setNewPerson({
        ...newPerson,
        name: name,
        id: maxId + 1,
      })
    }
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
        <Notification message={message}/>
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
          <Person person={p} key={p.id} handleOnClick={deletePerson(p)}/>
        )}
    </div>
  );
}

export default App;
