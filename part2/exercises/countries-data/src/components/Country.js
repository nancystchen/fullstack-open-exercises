const Country = ({country}) => {
  return (
    <>
      <h2> {country.name} </h2>
      <p> <b>Capital</b> {country.capital} </p>
      <p> <b>Population</b> {country.population} </p>
      <p> <b>Area</b> {country.area} </p>
      <h3> Languages </h3>
      {country.languages.map(l =>
        <p key={l.iso639_1}> {l.name} </p>
      )}
      <h3> Flag & Timezone </h3>
      <img src={country.flag} width="300" />
    </>
  )
}

export default Country
