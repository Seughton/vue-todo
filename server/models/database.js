const { Client } = require('pg')
const connectionString = 'postgresql://postgres:1111@localhost:5432/todo'
const client = new Client(connectionString)

try { 
    client.connect()
} catch(e) {
    console.log('->', e)
}

client.on('connect', () => console.log('Connected succesfully'))

module.exports = client