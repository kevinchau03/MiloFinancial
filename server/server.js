// Imports
const express = require('express')
// Connecting to MongoDB
const connectToDatabase = require('./connect')
// Router for user data
const userRouter = require('./routes/user')

const app = express ()
const port = 4000


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')


// This is connecting to the server
app.use(async (req, res, next) => {
    try{
        req.db = await connectToDatabase();
        next();
    }
    // Status 500 Fail
    catch (error){
        res.status(500).send('Failed to connect to database')
    }   
})

// Routes
app.use('/users', userRouter)

// Console log the local server
app.listen(port, () => {
    console.log(`Server is running on http://localhost${port}`)
})