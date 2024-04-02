const express = require('express');
const app = express();
const database = require('./config/database')
const dotenv = require('dotenv');
dotenv.config();
database();
const cors = require('cors');
const router = require('./routes/auth.routes');
const PORT = process.env.PORT || 3000


app.use(cors());
app.use(express.json())
app.use('/user', router)

app.listen(PORT, () => {
    console.log(`This server is runing sir ${PORT}`)
})
