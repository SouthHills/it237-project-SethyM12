import { checkBearerToken } from "../utils/Utils.js";
export { router as vendorRouter };
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from "../data-source.js";
import { Vendor } from "../entities/Vendor.js";
const router = express.Router();
router.use(bodyParser.json());
const secretKey = 'j3?gRac8wDo6tr0G';
router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const vendors = await AppDataSource.getRepository(Vendor).find();
    res.json(vendors);
});
router.get('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const vendor = await AppDataSource.getRepository(Vendor).findOneBy({
        vendorId: id
    });
    if (!vendor) {
        res.status(404).send(`Vendor with id ${id} not found!`);
    }
    else {
        res.json(vendor);
    }
});
router.put('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const vendorData = req.body;
    const vendorRepository = AppDataSource.getRepository(Vendor);
    const existingVendor = await vendorRepository.findOneBy({ vendorId: id });
    if (!existingVendor) {
        res.status(404).json({ message: `Vendor with ID ${id} not found!` });
        return;
    }
    vendorRepository.merge(existingVendor, vendorData);
    try {
        const updatedVendor = await vendorRepository.save(existingVendor);
        res.json(updatedVendor);
    }
    catch (e) {
        console.error("Error updating vendor: ", e);
        res.status(500).json({ message: "Failed to update vendor.", e });
    }
});
router.post('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const vendorData = req.body;
    const requiredFields = ['vendorId', 'vendorName', 'vendorCity', 'vendorState'];
    if (requiredFields.some(field => vendorData[field] == undefined
        || vendorData[field] === null)) {
        return res.status(400).json({ message: `All fields are required.` });
    }
    const vendorRepository = AppDataSource.getRepository(Vendor);
    const newVendor = vendorRepository.create(vendorData);
    try {
        const savedVendor = await vendorRepository.save(newVendor);
        res.status(201).json(savedVendor);
    }
    catch (e) {
        console.error("Error creating vendor: ", e);
        res.status(500).json({ message: "Failed to create vendor.", e });
    }
});
router.delete('/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!checkBearerToken(authHeader, secretKey)) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token." });
    }
    const id = parseInt(req.params.id, 10);
    const vendorRepository = AppDataSource.getRepository(Vendor);
    const vendor = await vendorRepository.findOneBy({ vendorId: id });
    if (!vendor) {
        res.status(404).json({ message: `Vendor with ID ${id} not found!` });
        return;
    }
    try {
        await vendorRepository.remove(vendor);
        res.status(204).send();
    }
    catch (e) {
        console.error("Error deleting vendor: ", e);
        res.status(500).json({ message: "Failed to delete vendor.", e });
    }
});
