// check authorized user
import express from 'express';
import cors from 'cors';
import env from "dotenv";
import bodyParser from 'body-parser';
import { isUserAuthenicated } from './middleware';
import { medicalData } from './controller';

env.config();
const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.post('/api/v1/getinfo', isUserAuthenicated, medicalData)
app.get('/testDocker', (req, res)=> res.send("<h1>Docker is working...</h1>"))

app.listen(port, () => console.log(`App is started ${port}`));

export default app;
