import {DataSource} from "typeorm";
import {Plant} from "./entities/Plant.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "smiles",
    password: "IT243Pwd!",
    database: "SaleCo",
    synchronize: true,
    logging: true,
    entities: [Plant],
    subscribers: [],
    migrations: []
});