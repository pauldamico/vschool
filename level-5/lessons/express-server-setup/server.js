const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/carsdb', console.log(`Connected to database`))

app.get('/', (req, res)=>{
    res.send(`<p>Welcome to the vehicle page</p><p>/car</p><p>/motorcycles</p>`)
})

app.use('/cars', require('./routes/carRouters.js'))
app.use('/motorcycles', require('./routes/motorcycleRouter.js'))
app.use('/dogs', require('./routes/dogRouter.js'))

app.use((err, req, res, next)=>{
res.send(err.message)
})

app.listen(9000, ()=>{
    console.log("Server is listening on Port 9000")
})



// const express = require('express')

// const app = express()
// app.use(express.json())

// app.get('/', (req, res)=>{
//     {res.send ("navigate to /cars or /motorcycles")}
// })
// app.use('/cars', require('./routes/carRouters.js'))
// app.use('/motorcycles', require('./routes/motorcycleRouter.js'))


// app.listen(9000, ()=>{
//     console.log("server is listening on port 9000")
// })







// const express = require("express")
// const app = express()

// app.use(express.json())

// const users = [{name:"Joe",age:13},
// {name:"Joe",age:13},
// {name:"Paul",age:22},
// {name:"Enzo",age:25},
// {name:"Tina",age:50},
// {name:"Sara",age:89},
// {name:"Jon",age:47},
// ]

// app.get("/users", (req, res)=>{
//     res.send(users)
// })

// app.post("/users", (req, res)=>{
// const newUser = req.body
// users.push(newUser)
// res.send("successfully added user")
// })

// app.listen(9000, ()=>{
//     console.log("Server is running on port 9000")
// })