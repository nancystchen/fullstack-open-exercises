import {useEffect, useState} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]); 
  const [country, setCountry] = useState({});

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
    setCountry({})
  }

  useEffect(getData, [])

  const filteredCountries = (countries) => {
    return countries.filter(c => 
      c.name
      .toLowerCase()
      .includes(filter.toLowerCase())
    )
  }

  const handleCountryUpdate = (c) => {
    return () => {
      setCountry(c)
    }
  }

  return (
    <div>
      <Filter 
        input={filter} 
        handleOnChange={handleFilterOnChange}
      />
      <Countries 
        countries={filteredCountries(countries)}
        country={country}
        handleOnClick={handleCountryUpdate} 
        setCountry={setCountry}
      />
      <Country country={country} />
    </div>
  );
}

export default App;
