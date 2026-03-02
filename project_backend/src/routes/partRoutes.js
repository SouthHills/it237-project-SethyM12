import { checkBearerToken } from "../utils/Utils.js";
export { router as partRouter };
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from "../data-source.js";
import { Part } from "../entities/Part.js";
const router = express.Router();
router.use(bodyParser.json());
const secretKey = 'j3?gRac8wDo6tr0G';
router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const partRepository = AppDataSource.getRepository(Part);
    const parts = await partRepository.find();
    res.json(parts);
});
router.get('/plant/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    try {
        const id = parseInt(req.params.id, 10);
        const partRepository = AppDataSource.getRepository(Part);
        const parts = await partRepository
            .createQueryBuilder("part")
            .innerJoin("BUILD", "build", "build.PART_ID = part.partId")
            .innerJoin("COMPONENT", "comp", "comp.COMP_ID = build.COMP_ID")
            .where("comp.PLANT_ID = :id", { id })
            .getMany();
        res.json(parts);
    }
    catch (e) {
        console.error("Error fetching parts by plant ID: ", e);
        res.status(500).json({ message: "Failed to fetch parts by plant ID.", e });
    }
});
router.get('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const part = await AppDataSource.getRepository(Part).findOneBy({
        partId: id
    });
    if (!part) {
        return res.status(404).json({ message: `Part with ${id} not found` });
    }
    res.json(part);
});
router.put('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const partData = req.body;
    const partRepository = AppDataSource.getRepository(Part);
    const existingPart = await partRepository.findOneBy({ partId: id });
    if (!existingPart) {
        res.status(404).json({ message: `Part with ID ${id} not found!` });
        return;
    }
    partRepository.merge(existingPart, partData);
    try {
        const updatedPart = await partRepository.save(existingPart);
        res.json(updatedPart);
    }
    catch (e) {
        console.error("Error updating part: ", e);
        res.status(500).json({ message: "Failed to update part.", e });
    }
});
router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const partData = req.body;
    const requiredFields = ['partId', 'partName', 'partQuantity', 'partSpecs'];
    if (requiredFields.some(field => partData[field] == undefined
        || partData[field] === null)) {
        res.status(400).json({ message: "Values are required for all columns except foreign keys." });
        return;
    }
    const partRepository = AppDataSource.getRepository(Part);
    if (partData.partId == null || partData.partId === undefined || partData.partId === 0) {
        /*https://typeorm.io/docs/query-builder/select-query-builder/*/
        const maxPart = await partRepository.createQueryBuilder("part")
            .select("MAX(part.PART_ID)", "max")
            .getRawOne();
        partData.partId = maxPart.max + 1;
    }
    try {
        const newPart = partRepository.create(partData);
        const savedPart = await partRepository.save(newPart);
        res.status(201).json(savedPart);
    }
    catch (e) {
        console.error("Error creating part: ", e);
        res.status(500).json({ message: "Failed to create part.", e });
    }
});
router.delete('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const partRepository = AppDataSource.getRepository(Part);
    const existingPart = await partRepository.findOneBy({ partId: id });
    if (!existingPart) {
        res.status(404).json({ message: `Part with ID ${id} not found!` });
        return;
    }
    try {
        await partRepository.remove(existingPart);
        res.status(204).send();
    }
    catch (e) {
        console.error("Error deleting part: ", e);
        res.status(500).json({ message: "Failed to delete part.", e });
    }
});
