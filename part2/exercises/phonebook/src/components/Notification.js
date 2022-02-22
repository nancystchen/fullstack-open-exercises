const style = {
  background: 'lightgrey',
  borderRadius: '5px',
  borderColor: 'black',
  borderStyle: 'solid',
  padding: '5px',
  marginBottom: '10px',
}

const Notification = ({message}) => {
  if (message === null)
    return null
  else {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification
