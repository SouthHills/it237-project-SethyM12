export { router as plantRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {Plant} from "../entities/Plant.js";
const router = express.Router();

router.use(bodyParser.json());