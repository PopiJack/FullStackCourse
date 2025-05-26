import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const SearchFilter = ({searchName, handleSearchChange}) => {
  
  return <div>
        filter shown with <input 
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>
}

const Form = ({addName, newName, handleNamesChange, newNumber, handleNumberChange}) => {
    return <form onSubmit={addName}>
  <div>
          name: <input 
          value={newName}
          onChange={handleNamesChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
}


const PhoneBook = ({peopleToShow, deleteName}) => {
  return <ul>
        {peopleToShow.map(person => {
          return <Person key={person.id} person={person} deleteName={() => deleteName(person)}/>
        }
          
        )}
      </ul>
}

const Person = ({person, deleteName}) => {
  return <li>
    {person.name} {person.number}  
    <button onClick={deleteName}>
      delete
    </button>
    </li>
}
 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorOccured, setErrorOccured] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }

    var isInPersons = function(person) {
      return person.name === newName
    }

    const updatePhoneNumber = function(id) {
      const person = persons.find(personInList => personInList.id === id)
      const changedPerson = {...person, number: newNumber}
      
      personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === id ? returnedPerson.data : person ))
        })
        .catch(error => {
          setErrorOccured(true)
          setErrorMessage(
            `Information of ${changedPerson.name} has already been removed from server `
          )
          setTimeout(() => {
            setErrorMessage(null)
            setErrorOccured(false)
          }, 3000)
          setPersons(persons.filter(personInList => personInList.id !== id))
        })
    }

    if (persons.find(isInPersons)) {
      if (window.confirm(`${persons.find(isInPersons).name} is already added to phonebook, replace the old number with a new one ?`)) {
        updatePhoneNumber(persons.find(isInPersons).id)
      }
      
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setErrorOccured(false)
          setErrorMessage(
            `Person '${personObject.name}' was added to the list`
          )
          setTimeout(() => {
            setErrorMessage(null)
            setErrorOccured(false)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    }
    setNewName('')
    setNewNumber('') 
  }


  const deleteName = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .remove(person.id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(personInList => personInList.id !== person.id))
      })
    }
    
  }

  const handleNamesChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const newSearchedName = event.target.value
    /* console.log(newSearchedName)*/
    setNewSearchName(newSearchedName)
    /* console.log(newSearchedName.length)*/

    if (newSearchedName.length !== 0) {
      /* console.log('something') */
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }



  const peopleToShow = showAll 
    ? persons 
    : persons.filter (person => {
      return person.name.toLowerCase().trim().includes(searchName.toLowerCase())
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} errorOccured={errorOccured}/>
      <SearchFilter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <Form addName={addName} newName={newName}  handleNamesChange={handleNamesChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PhoneBook peopleToShow={peopleToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App