import db from "../db/index.js";
import bcrypt from "bcrypt";
import { dsaUsers, dsaCounter } from "../db/schema.js";
import { eq } from "drizzle-orm";


const registerNewUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, password, email } = req.body;

        // Validate input data
        if (!name || !password || !email) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Check if user already exists
        const existingUsers = await db.select().from(dsaUsers).where(eq(dsaUsers.email, email));
        if (existingUsers.length > 0) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUsers = await db.insert(dsaUsers).values({
            name,
            email,
            password: hashedPassword
        }).returning();

        const newUser = newUsers[0];

        // Create counter record for the new user
        await db.insert(dsaCounter).values({
            userId: newUser.id,
            count: 0
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        // Extract user credentials from request body
        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        // Check if user exists
        const existingUsers = await db.select().from(dsaUsers).where(eq(dsaUsers.email, email));
        if (existingUsers.length === 0) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const user = existingUsers[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { registerNewUser, loginUser };
