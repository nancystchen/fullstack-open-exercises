import {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';
import notesService from './services/notes';

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
          alert(`note ${id} note found`)
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
    </div>
  )
}

export default App;
