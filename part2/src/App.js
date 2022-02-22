import {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';
import Notification from './components/Notification';
import notesService from './services/notes';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em> Note app, department of Nancy Chen </em>
    </div>
  )
}

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const postNotes = (notes) =>
    notesService
      .postNotes(notes)
      .then(data => {
        setNotes(notes.concat(data))
        setNewNote('')
      })
  
  useEffect(() => 
    notesService
      .getNotes()
      .then(data => {
        setNotes(data)
      }),
    []
  )

  const toggleImportanceOf = (id) => {
    return () => {
      const note = notes.find(n => n.id === id)
      const newNote = {...note, important: !note.important}
      notesService
        .putNotes(id, newNote)
        .then(data => {
          const newNotes = notes.map(n => (n.id !== note.id) 
            ? n
            : data
          )
          setNotes(newNotes)
        })
        .catch(err => {
          alert()
          setErrorMessage(`note ${id} note found`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(note))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleOnClick = () => {
    setShowAll(!showAll)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)

  return (
    <div>
      <h1> Notes </h1>
      <Notification message={errorMessage} />
      <button onClick={handleOnClick}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note
            note={note}
            key={note.id}
            toggleImportanceOf={toggleImportanceOf}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit"> save </button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
