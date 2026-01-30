import {DataSource} from "typeorm";
import {Plant} from "./entities/Plant.js";
import {Component} from "./entities/Component";
import {Part} from "./entities/Part";
import {User} from "./entities/User";
import {Vendor} from "./entities/Vendor";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "smiles",
    password: "IT243Pwd!",
    database: "SaleCo",
    synchronize: true,
    logging: true,
    entities: [Plant, Component, Part, User, Vendor],
    subscribers: [],
    migrations: []
});