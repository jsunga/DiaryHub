const express = require('express')
const app = express()
const redis = require('redis')

const client = redis.createClient()

app.get('/counter', (req, res) => {
  client.incr('myKey', (err, counter) => {
    res.send(`${counter}`);
  })
})

app.get('/counter/get', (req, res) => {
  client.get('myKey', (err, counter) => {
    res.send(counter)
  })
})

app.listen(5000)