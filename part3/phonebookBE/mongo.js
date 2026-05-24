require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Persons = mongoose.model('Persons', personSchema)

Persons.find({}).then(result => {

  if(result.length===0){
    Persons.insertMany([
      {
        'name': 'Arto Hellas',
        'number': '040-123456'
      },
      {
        'name': 'Ada Lovelace',
        'number': '39-44-5323523'
      },
      {
        'name': 'Dan Abramov',
        'number': '12-43-234345'
      },
      {
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122'
      }
    ]).then(() => {console.log('Persons successfully initialized')
      mongoose.connection.close()
    })
  }else if ((result.length > 0) && process.argv.length < 5) {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()

  } else if (process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const person = new Persons({
      name: newName,
      number: newNumber
    })
    person.save().then(result => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      mongoose.connection.close()
    })

  }})




