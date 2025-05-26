import { useEffect, useState } from 'react'
import WeatherService from './services/WeatherService'

const SearchCountry = ({country}) => {
  return (
    <p>{country.name.common}</p>
  )
}


const SearchResultCountries = (searchResult) => {

  const nothingToReturn = () => {
    return <div>
      nothing to return
    </div>
  }

  const tooManyCountriesToReturn = () => {
    return <div>
      Too many matches, specify another filter
    </div>
  }

  const oneCountryToReturn = (returnedCountry) => {
    return <div>
      <h1>{returnedCountry.name.common}</h1>
      <p>Capital: {returnedCountry.capital}</p>
      <p>Area: {returnedCountry.area} m^2</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(returnedCountry.languages).map(
          language => <li key={language}>{language}</li>
        )}
      </ul>
      <img src={returnedCountry.flags.png} alt="flag of country" />
    </div>
  }


  if (searchResult.results.length === 0 ) {
    return nothingToReturn()
  } else if (searchResult.results.length >= 10) {
    return tooManyCountriesToReturn()
  } else if (searchResult.results.length === 1) {
    const onlyCountry = searchResult.results[0]
    return oneCountryToReturn(onlyCountry)
  } else {
    return <div>
    {searchResult.results.map(
      country => <SearchCountry key={country.area} country={country} />
    )}
  </div>
  }
}


const App = () => {
  const [apiResult, setApiResult] = useState([])
  const [searchedTerm, setSearchedTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const text = WeatherService.getAll().then(
      (data) => {
        
        setApiResult(data)
      }
    )
  }, [])

  const handleChange = (event) => {
    const newSearchedTerm = event.target.value
    setSearchedTerm(newSearchedTerm)
    
    handleSearchResult(newSearchedTerm)
  }

  const handleSearchResult = (enteredInSearch) => {
      
      const filteredCountries = apiResult.filter(result =>{
        return result.name.common.toLowerCase().includes(enteredInSearch.toLowerCase())
        }
      )
      setSearchResult(filteredCountries)
      console.log(filteredCountries)
  }



  return (
    <div>
      <input type="text" onChange={handleChange} /> 
      <br/>
      <SearchResultCountries results={searchResult}/> 
    </div>
  )
}

export default App