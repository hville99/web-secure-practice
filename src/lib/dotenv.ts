import {config} from 'dotenv';

config();

const getOrThrow = (name: string): string => {
    const env = process.env[name];

    if (typeof env === 'undefined') {
        throw new Error(`Undefined var ${name}`); 
    }
    return env;
}

export const DB_HOST = getOrThrow("DB_HOST");
export const DB_PORT = parseInt(getOrThrow("DB_PORT"), 10);
export const DB_USER = getOrThrow("DB_USER");
export const DB_PASSWORD = getOrThrow("DB_PASSWORD");
export const DB_DB = getOrThrow("DB_DB");
export const FASTIFY_ADDR = getOrThrow("FASTIFY_ADDR");
export const FASTIFY_PORT = getOrThrow("FASTIFY_ADDR");

