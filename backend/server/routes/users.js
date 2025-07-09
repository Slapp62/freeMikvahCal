import { Router } from 'express';
import User from '../models/User.js';
import brypt from 'bcryptjs';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    try {
        const {email, password, ethnicity, location, special_onahs, preferences} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await brypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            password: hashedPassword,
            ethnicity,
            special_onahs,
            location,
            preferences
        });

        const savedUser = await newUser.save();

        const userResponse = {
            _id: savedUser._id,
            email: savedUser.email,
            ethnicity: savedUser.ethnicity,
            location: savedUser.location,
            special_onahs: savedUser.special_onahs,
            preferences: savedUser.preferences,
            createdAt: savedUser.createdAt
        }

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (error){
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        res.status(500).json({error: 'Internal server error'});

    }
})

userRouter.get('/', async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

export default userRouter;