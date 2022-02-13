import {useEffect, useState} from 'react';
import axios from 'axios';

import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]); 

  const getData = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => { 
          setCountries(response.data)
        }
      )
  };

  const handleFilterOnChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(getData, [])

  const filteredCountries = (countries) => {
    if (countries.length > 0) {
      return countries.filter(c => 
        c.name
        .toLowerCase()
        .includes(filter.toLowerCase())
      )
    } else {
      return []
    }
  }

  return (
    <div>
      <Filter 
        input={filter} 
        handleOnChange={handleFilterOnChange}
      />
      <Countries countries={filteredCountries(countries)} />
    </div>
  );
}

export default App;
