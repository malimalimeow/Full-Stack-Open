import { useState } from 'react'
const Filter = ({ filter, setFilter}) => {

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
      const update = [...persons, { 'name': newName, 'number': number }]
      setPersons(update)
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

const Persons = ({persons, filter }) => {

  const personToShow = filter=== "" ? persons:persons.filter(f => f.name.toLowerCase().startsWith(filter.toLowerCase()))
  return (
  <div>   
      <PersonLine personToShow={personToShow}/>
  </div>)
}

const PersonLine =({personToShow})=>(
  personToShow.map((p) => <p key={p.name}>{p.name} {p.number}</p>))

const App = () => {
  const [persons, setPersons] = useState([
    { 'name': 'Arto Hellas', 'number': '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />

      <h2>
        Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} setNumber={setNumber} number={number} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter}  />

    </div>
  )
}

export default App