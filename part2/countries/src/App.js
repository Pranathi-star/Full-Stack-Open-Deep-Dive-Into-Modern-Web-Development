import { useState, useEffect } from 'react'
import getAllCountries from './services/countries';

const Results = ({countries}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else {
    return (
      <>
      {countries.map((country) => <p>{country.name.common}</p>)}
      </>
)
}
}

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    getAllCountries(event.target.value)
    .then(countries => 
      {
        const reqCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setCountries(reqCountries)
      }
    )
  }

  return (
    <div>
      find countries <input value={searchQuery} onChange={handleChange} />    
      <Results countries = {countries}/>  
    </div>
  );
}

export default App;
