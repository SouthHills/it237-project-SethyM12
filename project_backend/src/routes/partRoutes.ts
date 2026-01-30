export { router as partRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {Part} from "../entities/Part.js";
const router = express.Router();

router.use(bodyParser.json());