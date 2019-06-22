const express = require('express')
const { MongoClient } = require('mongodb')
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

  app.get('/user', (req, res) => {
    users.find({}).toArray()
      .then(docs => {
        res.send(docs)
      })
      .catch(err => {
        console.log(err)
      })
  })

  app.post('/user/register', (req, res) => {
    const User = {
      username: req.body.username.toLowerCase(),
      firstname: req.body.firstname.toLowerCase(),
      lastname: req.body.lastname.toLowerCase(),
      password: req.body.password,
      goal: 0,
      remaining_calories: 0,
      calories: 0,
      carbs: 0,
      fats: 0,
      proteins: 0,
      recipes: [],
      workouts: [],
      checkins: [],
    }
    users.find({username: req.body.username.toLowerCase()}).toArray()
      .then(docs => {
        if (docs.length === 0) {
          users.insertOne(User)
            .then((result) => {
              res.json({
                user_id: result.insertedId,
                isAuth: 'true'
              })
              console.log(User)
            })
            .catch(() => {
              console.log('inserting data to db error')
            })
        } else {
          res.sendStatus(400)
        }
      })
      .catch(err => {
        console.log(err)
      })
  })

  app.post('/user/login', (req, res) => {
    users.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        console.log('ERROR')
        res.json(err)
      }
      if (user && user.password === req.body.password) {
        console.log('user logged in')
        res.json({
          user_id: user._id,
          isAuth: 'true'
        })
      } else {
        console.log('credentials wrong')
        res.json('login invalid')
      }
    })
  })

  app.listen(9000)
})