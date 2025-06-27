require('dotenv').config ()
const express = require('express')
const app = express()
var morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')

morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById (request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    const info = new Date()
    const lengthOfList = persons.length
    response.send(`<p>Phone book has info for ${lengthOfList} people </p>
        <p> ${info}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})