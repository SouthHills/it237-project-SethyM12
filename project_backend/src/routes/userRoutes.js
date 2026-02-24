export { router as userRouter };
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
const router = express.Router();
router.use(bodyParser.json());
const SALT_ROUNDS = 10;
// Strip the password away so all other user data is sent safely
function sanitizeUser(user) {
    if (!user)
        return user;
    const { userPassword, ...rest } = user;
    return rest;
}
router.get('/', async (_req, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users.map(sanitizeUser));
});
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await AppDataSource.getRepository(User).findOneBy({ userId: id });
    if (!user) {
        return res.status(404).send(`User with id ${id} not found!`);
    }
    res.json(sanitizeUser(user));
});
router.get('/login/:email/:password', async (req, res) => {
    const plainPassword = req.params.password;
    const email = req.params.email;
    const user = await AppDataSource.getRepository(User).findOneBy({ userEmail: email });
    if (!user) {
        return res.status(404).send(`Invalid login.`);
    }
    const passwordMatch = await bcrypt.compare(plainPassword, user.userPassword);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid login." });
    }
    res.json(sanitizeUser(user));
});
router.post('/', async (req, res) => {
    const userData = req.body;
    const requiredFields = ['userId', 'userFname', 'userLname', 'userEmail', 'userPassword', 'userRoleManager'];
    if (requiredFields.some(field => userData[field] == undefined || userData[field] === null)) {
        return res.status(400).json({ message: `All fields are required.` });
    }
    try {
        userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create(userData);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(sanitizeUser(savedUser));
    }
    catch (e) {
        console.error("Error creating user: ", e);
        res.status(500).json({ message: "Failed to create user.", e });
    }
});
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userData = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ userId: id });
    if (!existingUser) {
        return res.status(404).json({ message: `User with ID ${id} not found!` });
    }
    try {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
        }
        userRepository.merge(existingUser, userData);
        const updatedUser = await userRepository.save(existingUser);
        res.json(sanitizeUser(updatedUser));
    }
    catch (e) {
        console.error("Error updating user: ", e);
        res.status(500).json({ message: "Failed to update user.", e });
    }
});
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ userId: id });
    if (!user) {
        return res.status(404).json({ message: `User with ID ${id} not found!` });
    }
    try {
        await userRepository.remove(user);
        res.status(204).send();
    }
    catch (e) {
        console.error("Error deleting user: ", e);
        res.status(500).json({ message: "Failed to delete user.", e });
    }
});
