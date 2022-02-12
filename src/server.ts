import express, { Request, Response } from 'express'
import morgan from "morgan";
import addAppRoutes from './handlers/index';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(morgan('tiny'));
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
addAppRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
