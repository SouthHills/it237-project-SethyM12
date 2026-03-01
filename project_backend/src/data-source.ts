import { DataSource } from "typeorm";
import { Plant } from "./entities/Plant.js";
import { Component } from "./entities/Component.js";
import { Part } from "./entities/Part.js";
import { User } from "./entities/User.js";
import { Vendor } from "./entities/Vendor.js";
import { Build } from "./entities/Build.js";

import dotenv from "dotenv";
dotenv.config();
const DB_PWD = process.env.DB_PASSWORD;

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "cloudanddevops.database.windows.net",
    port: 1433,
    username: "sliggett24",
    password: `${DB_PWD}`,
    database: "Cloud and Devops Final DB",
    synchronize: false,
    logging: true,
    entities: [Plant, Component, Part, User, Vendor],
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
    extra: {
        options: {
            enableArithAbort: true,
        },
    },
});