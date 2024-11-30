const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

localhost:5000/settings


// GET back a user based on username
router.get('/api/users/:username', async (req, res) => {

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
router.post('/api/users/signup', async (req, res) => {
    const { username, password, email} = req.body;
    if (!username || !email || !password || username.length === 0 || email.length === 0 || password.length === 0) {
        return res.status(400).send('Username, email, and password cannot be empty');
    }
    try{
        const existingUser = await req.db.collection('Users').findOne({ username })
        if(existingUser){
            res.status(409).send("Existing username already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await req.db.collection('Users').insertOne({ 
            username, 
            password: hashedPassword, 
            email 
        });

        res.status(201).json({ insertedId: result.insertedId });
    }
    catch{
        res.status(500).send('Error creating user.')
    }
})

// POST. Login section. Use username and password. Responds back with which one is wrong.
router.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await req.db.collection('Users').findOne({ username })
        if (!user){
            return res.status(404).send("Error user not found")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }

        
        res.status(200).send('Login Success')
    }
    catch{
        res.status(500).send('Error creating user.')
    }
})

module.exports = router