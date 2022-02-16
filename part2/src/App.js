import {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const getNotes = () => 
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })

  const postNotes = (notes) =>
    axios
      .post('http://localhost:3001/notes')
      .then(response => {
        setNotes(notes.concat(response.data))
      })
  
  useEffect(getNotes,[])

  const toggleImportanceOf = (id) => {
    return () => {
      const putUrl = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const newNote = {...note, important: !note.important}
      axios
        .put(putUrl, newNote)
        .then(response => {
          const newNotes = notes.map(n => (n.id !== note.id) 
            ? n
            : response.data
          )
          setNotes(newNotes)
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
