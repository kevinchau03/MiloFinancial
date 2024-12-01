const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// GET back a user based on username
router.get('/api/users/:username', async (req, res) => {

    const { username } = req.params;

    try{
        const user = await req.db.collection('UserInfo').findOne({ username });
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

// POST. Login section. Use username and password. Responds back with which one is wrong.
router.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await req.db.collection('UserInfo').findOne({ username })
        if (!user){
            return res.status(401).send("Error user not found")
        }

        res.status(200).send("User found")

    }
    catch{
        res.status(500).send('Error creating user.')
    }
})

// POST - Create an Account
router.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    try {
        // Check if username already exists
        const existingUser = await req.db.collection('UserInfo').findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        // Check if email already exists
        const existingEmail = await req.db.collection('UserInfo').findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        // Create user in the database without hashing the password
        const result = await req.db.collection('UserInfo').insertOne({
            username,
            email,
            password, // Storing plain text password
            budget: 0,
            account_balance: 0,
            expenses: 0,
            revenue: 0,
            transaction_history: {},
        });

        // Respond with success
        res.status(201).json({
            message: 'Account created successfully.',
            userId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT - Update user
router.put('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { email, budget, account_balance, expenses, revenue, transaction_history } = req.body;

    try {
        // Check if user exists
        const user = await req.db.collection('UserInfo').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Prepare fields to update
        const updates = {};
        if (email) updates.email = email;
        if (budget != null) updates.budget = budget;
        if (account_balance != null) updates.account_balance = account_balance;
        if (expenses != null) updates.expenses = expenses;
        if (revenue != null) updates.revenue = revenue;
        if (transaction_history) updates.transaction_history = transaction_history;

        // Ensure there are fields to update
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update.' });
        }
        // Update user in the database
        const result = await req.db.collection('UserInfo').updateOne(
            { username },
            { $set: updates }
        );

        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: 'No changes made. User data is already up-to-date.' });
        }
        // Respond with success
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



module.exports = router