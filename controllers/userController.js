const { PrismaClient } = require("@prisma/client");

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const prisma = new PrismaClient() 
const secretKey = 'your_secret_key';

const registerUser = async (req,res) => {
    const {firstName, lastName, email, password} = req.body;
    console.log(req.body);
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    //validate email
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!emailRegex.test(email)) {
    //     return res.status(400).json({message: 'Invalid email address'});
    // }

    const userExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      })

    // Check if user already exists
    // const userExists = prisma.user.findUnique(user => user.email === email);
    if (userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const user = await prisma.user.create({
        data: {
            name : firstName + ' ' + lastName,
            email,
            password: hashedPassword
        }
    })

    
    
    res.status(201).json({message: 'User created successfully', user});
}


// Authentication route
const authenticateUser =  async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
        where:  {
            email: email
        }
    });

    if (user) {
        // Check if the password is correct
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            // Password does not match
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        // User not found
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

// Protected route
const authroizeUser = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    const tokenParts = token.split(' ')[1];
    try {
        const decoded = jwt.verify(tokenParts, secretKey);
        res.json({ message: 'Protected data', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const getUser = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    })

    if(!user){
        res.status(404).json({message: 'User not found'});
    }
    else{
        res.status(200).json({message: 'User found', user});
    }
}

const updateUser = async(req, res) => {
    const {firstName, secondName, email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    });

    if(!user){
        res.status(404).json({message: 'User not found'});
    }
    else{
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name: firstName + ' ' + secondName,
                email,
                password,
            }
        });

        res.status(200).json({message: 'User updated successfully', updatedUser});
    }
}

module.exports = {
    updateUser,
    registerUser,
    authenticateUser,
    authroizeUser,
    getUser
};



