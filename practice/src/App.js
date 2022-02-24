import react from 'react'
import {useState, useEffect} from 'react'


const App = () => {
  // for states we need to keep:
  // - we need to keep track of the filter/query string
  //
  // - we also need to keep track of data to display
  const [queryString, setQueryString] = useState('')
  const [companies, setCompanies] = useState([])

  const handleOnChange = (event) => {
    const qs = event.target.value
    setQueryString(qs)
    fetchData(qs)
  }

  const fetchData = (qs) => {
    if (qs === '') {
      setCompanies([])
    } else {
     fetch(`https://us-central1-eng-interview.cloudfunctions.net/stock-api-proxy?q=${qs}`)
      .then(response => response.json())
      .then(data => {
        setCompanies(data.result)
      })
    }
  }

  return (
    <div className="App">
      <Filter handleOnChange={handleOnChange} qs={queryString}/>
      <p> Results: </p>
      <Table companies={companies}/>
    </div>
  );
}

const Filter = ({handleOnChange, qs}) => {
  return(
    <label>
      Search for symbol to filter for
      <input 
        type="text" 
        value={qs}
        onChange={handleOnChange}
      >
      </input>
    </label>
  )
}

const Table = ({companies}) => {
  return(
    <table>
    {companies.map(c => {
        return (
        <tr>
          <td>
            {c.symbol}
          </td>
          <td>
            {c.description}
          </td>
        </tr>
      )}
    )}
    </table>
  )
}

// components:
// - we need some kind of input field where people can 
// put down filter to see results
//
// - we need to have a display (table?) to see the
// symbols and the descrption of each company that
// comes back from the search

export default App;
