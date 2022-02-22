const Note = ({note, toggleImportanceOf}) => {
  const label = note.important
    ? "mark not important"
    : "mark important"

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportanceOf(note.id)}>{label}</button>
    </li>
  );
}

export default Note;
