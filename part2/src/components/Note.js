const Note = ({note, toggleImportanceOf}) => {
  const label = note.important
    ? "mark not important"
    : "mark important"

  return (
    <>
      <li>{note.content}</li>
      <button onClick={toggleImportanceOf(note.id)}>{label}</button>
    </>
  );
}

export default Note;
