import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source.js";
import {Plant} from "./entities/Plant.js";

const app = express();
const port: number = 3000;

app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data source has been initialized!")
    })
    .catch((error: any) => {
        console.error("Error during data source initialization: ", error);
    });