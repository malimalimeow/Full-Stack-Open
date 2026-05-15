import { useEffect, useState } from 'react'
import axios from 'axios'
import personsService from './services/personsService'

const Filter = ({ filter, setFilter }) => {

  const filterName = (event) => {
    setFilter(event.target.value)
  }

  return (
    <p>filter shown with <input type="text" onChange={filterName} /></p>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, number, setNumber }) => {
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if ((persons.find(p => p.name === newName))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { 'name': newName, 'number': number }
      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNumber('')
          console.log("ok ya");

        })


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
        name: <input type="text" onChange={handleNameChange} />
        number: <input type="number" onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const Persons = ({ persons, filter }) => {

  const personToShow = filter === "" ? persons : persons.filter(f => f.name.toLowerCase().startsWith(filter.toLowerCase()))
  return (
    <div>
      <PersonLine personToShow={personToShow} />
    </div>)
}

const PersonLine = ({ personToShow }) => (
  personToShow.map((p) => <p key={p.name}>{p.name} {p.number}</p>))

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h2>
        Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} setNumber={setNumber} number={number} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />

    </div>
  )
}

export default App