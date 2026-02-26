import { Component } from "../entities/Component.js";
export { router as plantRouter };
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from "../data-source.js";
import { Plant } from "../entities/Plant.js";
const router = express.Router();
router.use(bodyParser.json());
router.get("/", async (req, res) => {
    const plants = await AppDataSource.getRepository(Plant).find();
    res.json(plants);
});
router.get('plant/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const components = await AppDataSource.getRepository(Component).find({
        where: { plantId: id }
    });
    res.json(components);
});
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const plantData = req.body;
    const plantRepository = AppDataSource.getRepository(Plant);
    const existingPlant = await plantRepository.findOneBy({ plantId: id });
    if (!existingPlant) {
        res.status(404).json({ message: `Plant with ID ${id} not found!` });
        return;
    }
    plantRepository.merge(existingPlant, plantData);
    try {
        const updatedPlant = await plantRepository.save(existingPlant);
        res.json(updatedPlant);
    }
    catch (e) {
        console.error("Error updating plant: ", e);
        res.status(500).json({ message: "Failed to update plant.", e });
    }
});
router.post('/', async (req, res) => {
    const plantData = req.body;
    const requiredFields = ['plantId', 'plantName', 'plantLocation', 'plantState'];
    if (requiredFields.some(field => plantData[field] == undefined
        || plantData[field] === null)) {
        return res.status(400).json({ message: `All fields are required.` });
    }
    const plantRepository = AppDataSource.getRepository(Plant);
    const newPlant = plantRepository.create(plantData);
    try {
        const savedPlant = await plantRepository.save(newPlant);
        res.status(201).json(savedPlant);
    }
    catch (e) {
        console.error("Error creating plant: ", e);
        res.status(500).json({ message: "Failed to create plant.", e });
    }
});
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const plantRepository = AppDataSource.getRepository(Plant);
    const plant = await plantRepository.findOneBy({ plantId: id });
    if (!plant) {
        res.status(404).json({ message: `Plant with ID ${id} not found!` });
        return;
    }
    try {
        await plantRepository.remove(plant);
        res.status(204).send();
    }
    catch (e) {
        console.error("Error deleting plant: ", e);
        res.status(500).json({ message: "Failed to delete plant.", e });
    }
});
