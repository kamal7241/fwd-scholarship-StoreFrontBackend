import { Pool } from "pg";
import dotenv from "dotenv"
import { Enviroment } from "./constants";
dotenv.config();
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;
let dataBase:string|undefined;
switch(ENV){
    case Enviroment.Test :
            dataBase = POSTGRES_DB_TEST;
    break;
    case Enviroment.Production :
        dataBase = POSTGRES_DB_TEST;
    break;
        default:
    dataBase = POSTGRES_DB;
}

const Client = new Pool({
    user: POSTGRES_USER,
    database: dataBase,
    password : POSTGRES_PASSWORD,
    host : POSTGRES_HOST,
});

export default Client;