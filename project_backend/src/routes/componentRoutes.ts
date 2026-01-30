export { router as componentRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {Component} from "../entities/Component.js";
const router = express.Router();

router.use(bodyParser.json());