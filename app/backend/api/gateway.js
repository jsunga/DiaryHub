const express = require('express')
const httpProxy = require('http-proxy')
const apiProxy = httpProxy.createProxyServer()
const app = express()

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy down :(')
})

app.all('/checkin*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:2000' })
})
app.all('/user*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:9000' })
})

app.all('/food*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8000' })
})

app.all('/recipe*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:7000' })
})

app.all('/workout*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:6000' })
})

app.all('/counter*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:5000' })
})

app.listen(4000)