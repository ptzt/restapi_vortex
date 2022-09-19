const express = require('express')
const morgan = require('morgan')
var cors = require('cors')


// Routes
const employeesRoutes = require( './routes/employees.routes')
const app = express()

var corsOptions = {
origin: 'http://localhost:3000/'
}

app.use(cors())

// Settings
app.set("port", 4018)

// Middlewares
app.use(morgan('dev')) 
app.use(express.json())

// Routes
app.use("/api/employees", employeesRoutes)


module.exports = app