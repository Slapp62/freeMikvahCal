const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/freeMikvahCal');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
}

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.post('/api/users', async (req, res) => {
    try {
        const {email, password} = req.body;

        const newUser = new User({
            email,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

app.get('/api/users', async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.get('/api/test', (req, res) => {
    res.json({
        message: 'server running',
        timestamp: new Date().toISOString()
    })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
