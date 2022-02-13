import Country from './Country'

const Countries = ({countries}) => {
  const count = countries.length
  if (count === 0) {
    return (
      <div> No countries to display </div>
    )
  } else if (count > 10) {
    return (
      <div> Too many countries to display. Narrow down the countries using the filter </div>
    )
  } else if (count > 1) {
    return (
      <ul>
        {countries.map(c =>
          <li key={c.name}> {c.name} </li>
        )}
      </ul>
    )
  } else {
    return (
      <Country country={countries[0]} />
    ) 
  }
}

export default Countries
