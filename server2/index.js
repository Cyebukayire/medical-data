const express = require('express')
const cors = require('cors')
const env = require('dotenv')
const bodyParser = ('body-parser')
const { isUserAuthenicated } = require('./middleware')
const { Data } = require('./controller')

env.config();
const app = express();
const port = 8050;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.post('/api/v1/data', isUserAuthenicated, Data)
app.listen(port, () => console.log(`App is started ${port}`));

module.exports = app;
