const Filter = ({input, handleOnChange}) => {
  return (
    <>
      <label>
        Filter by country name:
        <input value={input} onChange={handleOnChange}/>
      </label>
    </>
  )
}

export default Filter
