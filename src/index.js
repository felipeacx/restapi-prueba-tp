const express = require("express")
const app = express()
var cors = require('cors')
const { port } = require("./config")

//Allow cors policy
app.use(cors())

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use(require("./routes/index"))

app.listen(port)
console.log("Server on port",port)