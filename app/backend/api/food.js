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

  app.get('/food/:user_id', (req, res) => {
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

  app.post('/food/setgoal', (req, res) => {
    const { user_id , goal } = req.body
    users.updateOne({
      _id: new ObjectId(`${user_id}`)
    }, {
      $set: { goal: Number(goal), remaining_calories: Number(goal) }
    })
      .then(() => {
        res.send(`set goal to ${goal}`)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.post('/food/add', (req, res) => {
    const { user_id, calories, carbs, proteins, fats } = req.body
    users.updateOne({
      _id: new ObjectId(`${user_id}`)
    }, {
      $inc: {calories: Number(calories), remaining_calories: -Number(calories), carbs: Number(carbs), proteins: Number(proteins), fats: Number(fats)}
    })
      .then(() => {
        res.send('success')
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.post('/food/reset', (req, res) => {
    const { user_id, goal } = req.body
    users.updateOne({
      _id: new ObjectId(`${user_id}`)
    }, {
      $set: { remaining_calories: Number(goal), calories: 0, carbs: 0, proteins: 0, fats: 0 }
    })
      .then(() => {
        res.send('reset success')
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.listen(8000)
})