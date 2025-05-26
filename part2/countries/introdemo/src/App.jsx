import { useEffect, useState } from 'react'
import CountriesService from './services/CountriesService'
import WeatherService from './services/WeatherService'
const SearchCountry = ({country}) => {
  const [isAllowedToShow, setIsAllowedToShow] = useState(false)

  function handleButtonClick() {
    setIsAllowedToShow(!isAllowedToShow)
  }

  return <div>
    <p>{country.name.common} <button onClick={handleButtonClick}>Show</button></p>
    <DetailsPart country={country} isAllowedToShow={isAllowedToShow}/>
  </div>
}

const DetailsPart = ({country, isAllowedToShow}) => {
  if (isAllowedToShow) {
    return <CountryDetails country={country} />
  }
}

const CountryDetails = ({country}) => {
  const [weatherResults, setWeatherResults] = useState(null)


 useEffect(() => {
    WeatherService.getWeatherByCity(country.capital[0]).then(
      (data) => setWeatherResults(data)
    )
  }, [country])
  

  console.log(weatherResults)
  return <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} m2</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(
          language => <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag of country" />
      {weatherResults ? (
        <>
        <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature {Math.round((weatherResults.main.feels_like - 273.5) * 100)/100} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherResults.weather[0].icon}@2x.png`} />
      <p>Wind {weatherResults.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
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
    return <CountryDetails country={returnedCountry} />
  }

  const rightAmountOfCountriesReturned = (returnedCountries) => {
    return <div>
      {returnedCountries.map(
        country => <SearchCountry key={country.area} country={country} />
      )}
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
    return rightAmountOfCountriesReturned(searchResult.results)
  }
}


const App = () => {
  const [apiResult, setApiResult] = useState([])
  const [searchedTerm, setSearchedTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    CountriesService.getAll().then(
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