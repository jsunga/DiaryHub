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

  //get user details which includes recipes
  app.get('/recipe/:user_id', (req, res) => {
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

  app.post('/recipe/add', (req, res) => {
    const { user_id, name, calories, carbs, proteins, fats } = req.body
    users.updateOne({
      _id: new ObjectId(`${user_id}`)
    }, {
      $push: { recipes: {name: name, calories: Number(calories), carbs: Number(carbs), proteins: Number(proteins), fats: Number(fats) } }
    }, )
      .then(() => {
        res.send('add recipe success')
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.delete('/recipe/delete/:user_id/:recipe_name', (req, res) => {
    const { user_id, recipe_name } = req.params
    
  })

  app.listen(7000)
})