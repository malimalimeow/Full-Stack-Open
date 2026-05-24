require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Persons = require('./models/person.js')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ""
    }
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))



app.get('/api/persons', (request, response) => {
    Persons.find({}).then(result => {

        if (result.length === 0) {
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
                }]).then(result => {
                    response.send(result)
                    console.log("Persons successfully initialized")
                })
        } else if (result.length > 0) {
            response.send(result)
            result.forEach(person =>
                console.log(person))
        }
    })
})

app.get('/info', (request, response) => {

    Persons.find({}).then(result => {
        const count = result.length || 0
        response.send(
            `<p>Phonebook has info for ${count} people </p>
            <p>${new Date()} </p>`)
    })

})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Persons.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Persons.findByIdAndDelete(id).then(person => {
        if (person) {
            response.status(204).end()
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})



app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and number must be filed'
        })
    }

    Persons.find({}).then(result => {
        const allName = result.map(r => r.name.toLowerCase())
        if (allName.includes(body.name.toLowerCase())) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        const person = new Persons({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    Persons.findByIdAndUpdate(id, { name: body.name, number: body.number }, { new: true }).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})