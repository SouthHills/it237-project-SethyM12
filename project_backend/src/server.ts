import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source.js";
import {componentRouter} from "./routes/componentRoutes.js";
import {partRouter} from "./routes/partRoutes.js";
import {userRouter} from "./routes/userRoutes.js";
import {vendorRouter} from "./routes/vendorRoutes.js";
import {plantRouter} from "./routes/plantRoutes.js";

const app = express();
const port: number = 3000;

app.use(cors());

app.use(bodyParser.json());

// Debug: log POST body so we can see what the server receives (remove when done)
app.use((req, _res, next) => {
    if (req.method === 'POST' && req.originalUrl.startsWith('/users')) {
        console.log('POST /users - body received:', JSON.stringify(req.body));
    }
    next();
});

app.use("/components", componentRouter);
app.use("/parts", partRouter);
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);
app.use("/plants", plantRouter);

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