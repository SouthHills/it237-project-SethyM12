export { router as userRouter };
import express from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";
import jwt from 'jsonwebtoken';
import { checkBearerToken } from "../server.js";
const router = express.Router();
/* Body already parsed by app.use(bodyParser.json()) in server.ts - do not parse again or req.body can be lost */
const SALT_ROUNDS = 10;
const secretKey = 'j3?gRac8wDo6tr0G';
// Strip the password away so all other user data is sent safely
function sanitizeUser(user) {
    if (!user)
        return user;
    const { userPassword, ...rest } = user;
    return rest;
}
/*Sending Sanitized User*/
router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const users = await AppDataSource.getRepository(User).find();
    res.json(users.map(sanitizeUser));
});
/*Getting a user by ID*/
router.get('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const user = await AppDataSource.getRepository(User).findOneBy({ userId: id });
    if (!user) {
        return res.status(404).send(`User with id ${id} not found!`);
    }
    res.json(sanitizeUser(user));
});
/*router.get('/login/:email/:password', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

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

    const bearerToken = generateBearerToken(user.userId, secretKey);

    try{
        user.userToken = bearerToken;
        await AppDataSource.getRepository(User).save(user);
    }
    catch (e) {
        console.error("Error saving user token: ", e);
        return res.status(500).json({ message: "Failed to save user token.", e });
    }

    res.json({ token: bearerToken, user: sanitizeUser(user) });
});*/
// Create user
router.post('/', async (req, res) => {
    const userData = req.body;
    const userRepository = AppDataSource.getRepository(User);
    /*im just adding one to the highest user id*/
    if (userData.userId === null || userData.userId === undefined) {
        /*https://typeorm.io/docs/query-builder/select-query-builder/*/
        const maxUser = await userRepository.createQueryBuilder("user")
            .select("MAX(user.userId)", "max")
            .getRawOne();
        userData.userId = maxUser.max + 1;
    }
    try {
        userData.userPassword = await bcrypt.hash(userData.userPassword, SALT_ROUNDS);
        const newUser = userRepository.create(userData);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(sanitizeUser(savedUser));
    }
    catch (e) {
        console.error("Error creating user: ", e);
        res.status(500).json({ message: "Failed to create user, email might already exist.", e });
    }
});
/*Updating an existing User*/
router.put('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const userData = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ userId: id });
    if (!existingUser) {
        return res.status(404).json({ message: `User with ID ${id} not found!` });
    }
    try {
        if (userData.userPassword) {
            userData.userPassword = await bcrypt.hash(userData.userPassword, SALT_ROUNDS);
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
/*VERIFY LOGIN HERE, POST BECAUSE GET REQUESTS PUT DATA IN THE URL*/
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ userEmail: email });
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' }); /*401 code is used authentication failures*/
    }
    const passwordMatch = await bcrypt.compare(password, user.userPassword);
    if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' }); /*401 code is used authentication failures*/
    }
    // Generate a new token on successful login
    const bearerToken = generateBearerToken(user.userId, secretKey);
    try {
        user.userToken = bearerToken;
        await userRepository.save(user);
    }
    catch (e) {
        console.error("Error saving user token: ", e);
        return res.status(500).json({ success: false, message: "Failed to save user token.", e });
    }
    res.json({ success: true, message: 'Login successful', user: sanitizeUser(user), token: bearerToken });
});
/*Deleting using by ID here*/
router.delete('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
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
function generateBearerToken(userId, secretKey, expiresIn = 3600) {
    const payload = { userId };
    const options = { expiresIn };
    return jwt.sign(payload, secretKey, options);
}
