export { router as vendorRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {Vendor} from "../entities/Vendor.js";
const router = express.Router();

router.use(bodyParser.json());