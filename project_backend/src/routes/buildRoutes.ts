import {checkBearerToken} from "../utils/Utils.js";

export { router as buildRouter }

import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from "../data-source.js";
import {Build} from "../entities/Build.js";

const router = express.Router();

router.use(bodyParser.json());

const secretKey = 'j3?gRac8wDo6tr0G';

router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    const builds = await AppDataSource.getRepository(Build).find();
    res.json(builds);
});

router.get('/plant/:plantId', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    try {
        const plantId = parseInt(req.params.plantId, 10);

        const builds = await AppDataSource
            .getRepository(Build)
            .createQueryBuilder("build")
            .innerJoin("COMPONENT", "comp", "comp.COMP_ID = build.compId")
            .where("comp.PLANT_ID = :plantId", { plantId })
            .getMany();

        res.json(builds);
    }
    catch (e) {
        console.error("Error fetching builds by plant ID: ", e);
        res.status(500).json({ message: "Failed to fetch builds by plant ID.", e });
    }
});

router.get('/:partId/:compId', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    const partId = parseInt(req.params.partId, 10);
    const compId = parseInt(req.params.compId, 10);

    const build = await AppDataSource.getRepository(Build).findOneBy({
        partId: partId,
        compId: compId
    });

    if(!build) {
        return res.status(404).json({ message: `Build with part ID ${partId} and component ID ${compId} not found` });
    }
    res.json(build);
});

router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    const buildData = req.body;

    const requiredFields = ['partId', 'compId'];

    if(requiredFields.some(field => buildData[field] == undefined
        || buildData[field] === null)){
        return  res.status(400).json({ message: `All fields are required.` });
    }

    const buildRepository = AppDataSource.getRepository(Build);
    const newBuild = buildRepository.create(buildData);

    try{
        const savedBuild = await buildRepository.save(newBuild);
        res.status(201).json(savedBuild);
    }
    catch (e){
        console.error("Error creating build: ", e);
        res.status(500).json({ message: "Failed to create build.", e });
    }
});

router.put('/:partId/:compId', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    const partId = parseInt(req.params.partId, 10);
    const compId = parseInt(req.params.compId, 10);
    const buildData = req.body;

    const buildRepository = AppDataSource.getRepository(Build);
    const existingBuild = await buildRepository.findOneBy({partId, compId});


    if(!existingBuild) {
        res.status(404).json({ message: `Build with part ID ${partId} and component ID ${compId} not found!` });
        return;
    }

    buildRepository.merge(existingBuild, buildData);

    try{
        const updatedBuild = await buildRepository.save(existingBuild);
        res.json(updatedBuild);
    }
    catch (e){
        console.error("Error updating build: ", e);
        res.status(500).json({ message: "Failed to update build.", e });
    }
});

router.delete('/:partId/:compId', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }

    const partId = parseInt(req.params.partId, 10);
    const compId = parseInt(req.params.compId, 10);

    const buildRepository = AppDataSource.getRepository(Build);
    const build = await buildRepository.findOneBy({partId, compId});

    if(!build) {
        res.status(404).json({ message: `Build with part ID ${partId} and component ID ${compId} not found!` });
        return;
    }

    try{
        await buildRepository.remove(build);
        res.json({ message: "Build deleted successfully." });
    }
    catch (e){
        console.error("Error deleting build: ", e);
        res.status(500).json({ message: "Failed to delete build.", e });
    }
});