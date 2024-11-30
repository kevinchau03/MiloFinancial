const express = require('express')
const router = express.Router()



// GET back a user based on username
router.get('/:username', async (req, res) => {

    const { username } = req.params;

    try{
        const user = await req.db.collection('Users').findOne({ username });
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(404).send('User not found')
        }
    }catch (error){
        res.status(500).send('Error retrieving user')
    }
})

// POST registration. Includes an email for the account
router.post('/signup', async (req, res) => {
    const { username, password, email} = req.body;
    try{
        const result = await req.db.collection('Users').insertOne({username, password, email})
        res.status(201).json({insertedId: result.insertedId})
    }
    catch{
        res.status(500).send('Error creating user.')
    }
})

// POST. Uses Bycrypt for security purposes
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await req.db.collection('Users').findOne({ username })
        if (!user){
            return res.status(404).send("Error user not found")
        }
        if(password != user.password){
            res.status(401).send("Error password is invalid")
        }
        
        res.status(200).send('Login Success')
    }
    catch{
        res.status(500).send('Error creating user.')
    }
})


module.exports = router