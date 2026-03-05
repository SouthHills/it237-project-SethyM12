import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source.js";
import { componentRouter } from "./routes/componentRoutes.js";
import { partRouter } from "./routes/partRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { vendorRouter } from "./routes/vendorRoutes.js";
import { plantRouter } from "./routes/plantRoutes.js";
import { buildRouter } from "./routes/buildRoutes.js";
export const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/components", componentRouter);
app.use("/parts", partRouter);
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);
app.use("/plants", plantRouter);
app.use("/builds", buildRouter);
app.listen(port, () => {
    console.log(`Server is listening at: http://localhost:${port}`);
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data source has been initialized!");
})
    .catch((error) => {
    console.error("Error during data source initialization: ", error);
});
