const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/User');
const jwt = require('jsonwebtoken');
const secret = '546grwghwhfuh83y81y3u13swgwr';

const app = express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

// Load environment variables
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        const userDoc = await User.create({ username, password: hashedPassword });
        res.status(201).json(userDoc); // Send user document as a response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user.' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json('User not found');
        }

        const passOk = await bcrypt.compare(password, userDoc.password);
        if (passOk) {
            // Generate JWT token
            jwt.sign(
                { username, id: userDoc._id },
                secret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json('ok');
                }
            );
        } else {
            res.status(400).json('Wrong credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
