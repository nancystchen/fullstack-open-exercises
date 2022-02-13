const Filter = ({onChange}) => {
  return(
    <>
      <label> filter contact by name:
        <input type="text" onChange={onChange}/>
      </label>
    </>
  )
}

export default Filter
