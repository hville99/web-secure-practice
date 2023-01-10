import { DataSource } from "typeorm"
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOSTNAME,
    port: parseInt(`${process.env.PORT}`, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "test",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })