const mongoose = require('mongoose')
const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 }).then(result => {
    console.log('connected to MongoDB')
})
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /(\d{2}-\d{6,})|(\d{3}-\d{5,})|\d{8,}/.test(v);
            },
        },
        required: true
    }
});


personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Persons = mongoose.model('Persons', personSchema)

module.exports = Persons