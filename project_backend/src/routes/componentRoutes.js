export { router as componentRouter };
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from "../data-source.js";
import { Component } from "../entities/Component.js";
const router = express.Router();
router.use(bodyParser.json());
router.get('/', async (req, res) => {
    const components = await AppDataSource.getRepository(Component).find();
    res.json(components);
});
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const component = await AppDataSource.getRepository(Component).findOneBy({
        compId: id
    });
    if (!component) {
        return res.status(404).send(`Component with id ${id} not found!`);
    }
    res.json(component);
});
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const componentData = req.body;
    const componentRepository = AppDataSource.getRepository(Component);
    const existingComponent = await componentRepository.findOneBy({ compId: id });
    if (!existingComponent) {
        res.status(404).json({ message: `Component with ID ${id} not found!` });
        return;
    }
    componentRepository.merge(existingComponent, componentData);
    try {
        const updatedComponent = await componentRepository.save(existingComponent);
        res.json(updatedComponent);
    }
    catch (e) {
        console.error("Error updating component: ", e);
        res.status(500).json({ message: "Failed to update component.", e });
    }
});
router.post('/', async (req, res) => {
    const componentData = req.body;
    const requiredFields = ['compId', 'compName', 'compQuantity', 'compSpecs'];
    if (requiredFields.some(field => componentData[field] == undefined
        || componentData[field] === null)) {
        return res.status(400).json({ message: `All fields are required except PLANT_ID` });
    }
    const componentRepository = AppDataSource.getRepository(Component);
    try {
        const newComponent = componentRepository.create(componentData);
        const savedComponent = await componentRepository.save(newComponent);
        res.status(201).json(savedComponent);
    }
    catch (e) {
        console.error("Error creating component: ", e);
        res.status(500).json({ message: "Failed to create component.", e });
    }
});
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const componentRepository = AppDataSource.getRepository(Component);
    const existingComponent = await componentRepository.findOneBy({ compId: id });
    if (!existingComponent) {
        res.status(404).json({ message: `Component with ID ${id} not found!` });
        return;
    }
    try {
        await componentRepository.remove(existingComponent);
        res.status(204).send();
    }
    catch (e) {
        console.error("Error deleting component: ", e);
        res.status(500).json({ message: "Failed to delete component.", e });
    }
});
