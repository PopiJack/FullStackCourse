import { useState } from 'react'


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


const PhoneBook = ({peopleToShow}) => {
  return <ul>
        {peopleToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
}

const Person = ({person}) => {
  return <li>{person.name} {person.number}</li>
}
 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

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

    if (persons.find(isInPersons)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    
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
      return person.name.toLowerCase().trim().includes(searchName)
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <Form addName={addName} newName={newName}  handleNamesChange={handleNamesChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PhoneBook peopleToShow={peopleToShow} />
    </div>
  )
}

export default App