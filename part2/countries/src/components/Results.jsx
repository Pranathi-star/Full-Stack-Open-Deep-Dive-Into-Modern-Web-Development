const CountryData = ({country}) => {
    console.log(country)
    const langObject = country.languages
    console.log(langObject)
    const langList = Object.values(langObject)
    const languages = langList.map((lang) => <li>{lang}</li>)
    
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    )
  }
  
const Results = ({countries, searchQuery, handleShow}) => {
    const c = countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
    if (c.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
    else if (c.length > 1){
      return (
          <>
            {c.map((country) => 
            <div>
              <p style = {{display: "inline-block"}}>{country.name.common}</p>
              <button style = {{display: "inline-block"}} onClick={() => handleShow(country.name.common)}>show</button>
            </div>
            )}
          </>
        )
      }
    
    else if (c.length === 1){
      return (
        <CountryData country={c[0]} />
      )
    }
}

export default Results