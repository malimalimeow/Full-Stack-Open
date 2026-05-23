const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://Malimalimeow:${password}@ac-hw1wb7j-shard-00-00.ygrbjdm.mongodb.net:27017,ac-hw1wb7j-shard-00-01.ygrbjdm.mongodb.net:27017,ac-hw1wb7j-shard-00-02.ygrbjdm.mongodb.net:27017/?ssl=true&replicaSet=atlas-sex75p-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Persons = mongoose.model('Persons', personSchema)

Persons.insertMany([
    {
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]).then(result => {
    console.log('note saved!')
    return Persons.find({})
}).then(found => {
    console.log(found)
    mongoose.connection.close()
})


