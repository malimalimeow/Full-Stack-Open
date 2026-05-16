import { useEffect, useState } from 'react'
import axios from 'axios'
import personsService from './services/personsService'
import './app.css'

const Notification = ({ message, isError,setMessage }) => {
  useEffect(()=>{
    //prevent it from infinite loop =>cuz setMsg to null is also a change to useEffect.
    if (message === null) {
    return 
  }
  //set a timer for 5 sec
  const timer=setTimeout(()=>{setMessage(null)},5000)
  //remove it if second timer triggered
  return()=>clearTimeout(timer)

},[message,setMessage])

  if (message === null) {
    return null
  }

  const color = isError ? "error" : "success"

  return (
    <div className={`notice ${color}`} >
      {message}
    </div>
  )
}

const Filter = ({ filter, setFilter }) => {

  const filterName = (event) => {
    setFilter(event.target.value)
  }

  return (
    <p>filter shown with <input type="text" onChange={filterName} /></p>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, number, setNumber, setIsError, setMessage }) => {
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const person_exist = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (person_exist) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const update = { ...person_exist, "number": number }
        personsService.update(update.id, update)
          .then(returnedPerson => {
            const update_person = persons.map(p => p.id === returnedPerson.id ? returnedPerson : p)
            setPersons(update_person)
            setMessage("database updated")
            setIsError(false)
          })
          .catch(error => {
            setMessage(`can't find ${newName}`)
            setIsError(true)
          })
      }
    } else {
      const newPerson = { 'name': newName, 'number': number }
      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
        })
      setNewName('')
      setNumber('')
      setMessage(`Added ${newName} `)
      setIsError(false)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>
        <p>name: <input required value={newName} type="text" onChange={handleNameChange} /></p>
        <p>number: <input required value={number} type="number" onChange={handleNumberChange} /></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const Persons = ({ persons, filter, setPersons,setIsError, setMessage }) => {

  const personToShow = filter === "" ? persons : persons.filter(f => f.name.toLowerCase().startsWith(filter.toLowerCase()))

  return (
    <div>
      <PersonLine setPersons={setPersons} persons={persons} personToShow={personToShow} setIsError={setIsError} setMessage={setMessage} />

    </div>)
}

const PersonLine = ({ persons, personToShow, setPersons, setIsError, setMessage}) => {
  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          const update = persons.filter(p => p.id !== id)
          setPersons(update)
          setMessage(`${name} is deleted.`)
          setIsError(false)
        })
        .catch(error => {
          setMessage(`Information of ${name} has already been removed from server `)
          setIsError(true)
          setPersons(persons.filter(p => p.id !== id))

        })
    }
  }

  return (

    personToShow.map((p) => (
      <div key={p.id}> {`${p.name} ${p.number} `}
        <button onClick={() => handleDelete(p.name, p.id)}>delete</button>
      </div>))

  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState (null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        setIsError(true)
        setMessage("can't find database")
      })
  }, [])

 

  return (
    <div>
      <h2>Phonebook</h2>

      < Notification message={message} isError={isError} setMessage={setMessage} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>
        Add a new</h2>

      <PersonForm setMessage={setMessage} setIsError={setIsError} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} setNumber={setNumber} number={number} />

      <h2>Numbers</h2>

      <Persons setMessage={setMessage} setIsError={setIsError}  setPersons={setPersons} persons={persons} filter={filter} />

    </div>
  )
}

export default App