const Countries = ({countries, country, handleOnClick, setCountry}) => {
  const count = countries.length
  if (count < 2 || country.name) {
    if (count === 1) {
      setCountry(countries[0])
    } else if (country.name) {
      return (
        <></>
      )
    } else {
      return(
        <div> No countries matched </div>
      )
    }
  } else if (count > 10) {
    return (
      <div> Too many countries to display. Narrow down the countries using the filter </div>
    )
  } else {
    return (
      <ul>
        {countries.map(c =>
          <p key={c.name}>
            <label> {c.name} 
              <button onClick={handleOnClick(c)}> show </button>
            </label>
          </p>
        )}
      </ul>
    )
  } 
}

export default Countries
