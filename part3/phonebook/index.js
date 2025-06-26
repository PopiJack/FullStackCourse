const express = require('express')
const app = express()
var morgan = require('morgan')

morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = (maximumNumber) => {
    const maxId = Math.floor(Math.random() * maximumNumber)
    return String(maxId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content is missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(10000)
    }

    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    const info = new Date()
    const lengthOfList = persons.length
    response.send(`<p>Phone book has info for ${lengthOfList} people </p>
        <p> ${info}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})