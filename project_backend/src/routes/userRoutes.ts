export { router as userRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {User} from "../entities/User.js";
const router = express.Router();

router.use(bodyParser.json());