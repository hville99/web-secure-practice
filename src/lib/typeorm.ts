import { DataSource, Db } from "typeorm";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DB } from "./dotenv";
import { User } from "../entities/user";
import {Subscriber} from "../entities/subscriber";

//require('dotenv').config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    database: DB_DB,
    password: DB_PASSWORD,
    entities: [User],
    subscribers: [Subscriber]
})

