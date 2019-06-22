const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2)

const url = 'mongodb://localhost:27017'
const dbName = 'diaryhub'

const client = new MongoClient(url, { useNewUrlParser: true })

client.connect(function(err) {
  console.log("Connected to server")
  const db = client.db(dbName)
  const users = db.collection('users')

  app.get('/workout/:user_id', (req, res) => {
    const user_id = req.params.user_id
    users.findOne({
      _id: new ObjectId(`${user_id}`)
    })
      .then(doc => {
        res.send(doc)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.post('/workout/add', (req, res) => {
    const { user_id, exercise_name, sets, reps, weight } = req.body
    users.updateOne({
      _id: new ObjectId(`${user_id}`)
    }, {
      $push: { workouts: {exercise_name, sets, reps, weight } }
    }, )
      .then(() => {
        res.send('add exercise success')
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.listen(6000)
})
