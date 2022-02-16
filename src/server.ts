import  dotenv  from 'dotenv';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import addAppRoutes from './handlers';
import { Enviroment, ports } from './constants';
export const app: express.Application = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});
addAppRoutes(app);

dotenv.config();
const {ENV} = process.env;
let port:ports = ports.Dev;
if(ENV == Enviroment.Test){
    port = ports.Test;
}
const address = `0.0.0.0:${port}`;
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
